/**
 * ACME 客户端：使用 DNS-01 向 Let's Encrypt 申请证书
 */
import { Client, crypto as acmeCrypto } from 'acme-client';
import { setTxt, removeTxt } from './dns.js';

const LETSENCRYPT_PRODUCTION =
  'https://acme-v02.api.letsencrypt.org/directory';

export interface AcmeResult {
  certificate: string;
  privateKey: Buffer;
}

export async function obtainCertificate(options: {
  domains: string[];
  accountKeyPem?: string | Buffer;
  email: string;
  directoryUrl?: string;
}): Promise<AcmeResult> {
  const {
    domains,
    email,
    directoryUrl = process.env.ACME_DIRECTORY_URL || LETSENCRYPT_PRODUCTION,
  } = options;

  console.log('[acme] directoryUrl:', directoryUrl);
  console.log('[acme] generating account key...');
  let accountKey: Buffer;
  if (options.accountKeyPem) {
    accountKey =
      typeof options.accountKeyPem === 'string'
        ? Buffer.from(options.accountKeyPem, 'utf8')
        : options.accountKeyPem;
  } else {
    accountKey = await acmeCrypto.createPrivateKey();
  }
  console.log('[acme] account key ready');

  console.log('[acme] creating ACME client...');
  const client = new Client({
    directoryUrl,
    accountKey,
  });
  console.log('[acme] client created');

  console.log('[acme] generating CSR for:', domains.join(', '));
  const [privateKey, csr] = await acmeCrypto.createCsr({
    commonName: domains[0],
    altNames: domains,
  });
  console.log('[acme] CSR generated');

  const challengeCreateFn = async (
    _authz: { identifier: { value: string } },
    _challenge: { type: string },
    keyAuthorization: string
  ): Promise<void> => {
    const identifier = _authz.identifier.value;
    if (_challenge.type !== 'dns-01') {
      throw new Error(`Unsupported challenge type: ${_challenge.type}`);
    }
    console.log('[acme] challenge create for:', identifier);
    // acme-client 的 getChallengeKeyAuthorization 对 dns-01 已经做了 SHA256+base64url
    // keyAuthorization 就是最终的 TXT 值，不需要再 digest
    await setTxt(identifier, keyAuthorization);
    console.log('[acme] TXT record set, waiting 60s for DNS propagation...');
    await sleep(60000);
    console.log('[acme] DNS propagation wait done');
  };

  const challengeRemoveFn = async (
    authz: { identifier: { value: string } },
    _challenge: { type: string }
  ): Promise<void> => {
    if (_challenge.type !== 'dns-01') return;
    console.log('[acme] challenge remove for:', authz.identifier.value);
    await removeTxt(authz.identifier.value);
  };

  console.log('[acme] starting auto flow (skipChallengeVerification=true)...');
  const certPem = await client.auto({
    csr,
    challengeCreateFn,
    challengeRemoveFn,
    email,
    termsOfServiceAgreed: true,
    challengePriority: ['dns-01'],
    skipChallengeVerification: true,
  });
  console.log('[acme] certificate obtained');

  return {
    certificate: certPem,
    privateKey,
  };
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
