/**
 * 阿里云 OSS PutCname：将 HTTPS 证书绑定到 OSS bucket 的自定义域名
 * API: POST /?cname&comp=add
 * 文档: https://help.aliyun.com/zh/oss/developer-reference/putcname
 */
import { createHmac } from 'crypto';
import https from 'https';
import { getCredentials } from './credentials.js';

function signV1(
  method: string,
  resource: string,
  headers: Record<string, string>,
  accessKeyId: string,
  accessKeySecret: string,
): string {
  const contentMd5 = headers['content-md5'] || '';
  const contentType = headers['content-type'] || '';
  const date = headers['date'] || '';

  const ossHeaders = Object.keys(headers)
    .filter((k) => k.startsWith('x-oss-'))
    .sort()
    .map((k) => `${k}:${headers[k]}`)
    .join('\n');
  const ossHeaderStr = ossHeaders ? ossHeaders + '\n' : '';

  const stringToSign = `${method}\n${contentMd5}\n${contentType}\n${date}\n${ossHeaderStr}${resource}`;

  const signature = createHmac('sha1', accessKeySecret)
    .update(stringToSign)
    .digest('base64');

  return `OSS ${accessKeyId}:${signature}`;
}

function buildCnameXml(domain: string, certPem: string, privateKeyPem: string): string {
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<BucketCnameConfiguration>',
    '  <Cname>',
    `    <Domain>${escapeXml(domain)}</Domain>`,
    '    <CertificateConfiguration>',
    `      <Certificate>${escapeXml(certPem)}</Certificate>`,
    `      <PrivateKey>${escapeXml(privateKeyPem)}</PrivateKey>`,
    '      <Force>true</Force>',
    '    </CertificateConfiguration>',
    '  </Cname>',
    '</BucketCnameConfiguration>',
  ].join('\n');
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export interface BindCertOptions {
  bucket: string;
  region?: string;
  domain: string;
  certificatePem: string;
  privateKeyPem: Buffer | string;
}

/**
 * 通过 PutCname API 将证书绑定到 OSS bucket 的自定义域名，启用 HTTPS。
 */
export async function bindCertificate(options: BindCertOptions): Promise<void> {
  const {
    bucket,
    region = process.env.CERT_OSS_REGION || 'oss-cn-hangzhou',
    domain,
    certificatePem,
    privateKeyPem,
  } = options;

  const { accessKeyId, accessKeySecret, securityToken } = getCredentials();

  const privkeyStr =
    typeof privateKeyPem === 'string'
      ? privateKeyPem
      : privateKeyPem.toString('utf8');

  const body = Buffer.from(buildCnameXml(domain, certificatePem, privkeyStr), 'utf8');

  const host = `${bucket}.${region}.aliyuncs.com`;
  const date = new Date().toUTCString();
  const canonicalResource = `/${bucket}/?cname&comp=add`;

  const headers: Record<string, string> = {
    'host': host,
    'date': date,
    'content-type': 'application/xml',
    'content-length': String(body.length),
  };
  if (securityToken) {
    headers['x-oss-security-token'] = securityToken;
  }

  headers['authorization'] = signV1(
    'POST',
    canonicalResource,
    headers,
    accessKeyId,
    accessKeySecret,
  );

  return new Promise<void>((resolve, reject) => {
    const req = https.request(
      {
        hostname: host,
        port: 443,
        path: '/?cname&comp=add',
        method: 'POST',
        headers,
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
            resolve();
          } else {
            reject(new Error(`OSS PutCname failed (${res.statusCode}): ${data}`));
          }
        });
      },
    );
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}
