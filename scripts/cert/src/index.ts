/**
 * 证书自动更新：Let's Encrypt DNS-01 + 阿里云 DNS + OSS PutCname 绑定证书
 * 供函数计算定时触发器调用
 */
import { obtainCertificate } from './acme.js';
import { bindCertificate } from './cname.js';

export interface HandlerEvent {
  triggerTime?: string;
  triggerName?: string;
  payload?: string;
}

export interface HandlerContext {
  requestId?: string;
  function?: { name: string };
}

export interface HandlerResult {
  statusCode: number;
  body: string;
  headers?: Record<string, string>;
}

function getRequiredEnv(name: string): string {
  const v = process.env[name];
  if (!v || !String(v).trim()) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return v.trim();
}

function log(step: string, detail?: string): void {
  const msg = detail ? `[cert] ${step}: ${detail}` : `[cert] ${step}`;
  console.log(msg);
}

async function run(): Promise<{ success: boolean; message: string }> {
  log('start');

  const domainStr = getRequiredEnv('CERT_DOMAIN');
  const bucket = getRequiredEnv('CERT_OSS_BUCKET');
  const email = getRequiredEnv('ACME_ACCOUNT_EMAIL');
  log('env', `domain=${domainStr} bucket=${bucket} email=${email}`);

  const domains = domainStr.split(',').map((d) => d.trim()).filter(Boolean);
  if (domains.length === 0) {
    throw new Error('CERT_DOMAIN must contain at least one domain');
  }

  log('acme', 'obtaining certificate...');
  const result = await obtainCertificate({ domains, email });
  log('acme', 'certificate obtained');

  const mainDomain = domains[0];
  log('cname', `binding certificate to ${mainDomain} on bucket ${bucket}...`);
  await bindCertificate({
    bucket,
    region: process.env.CERT_OSS_REGION,
    domain: mainDomain,
    certificatePem: result.certificate,
    privateKeyPem: result.privateKey,
  });
  log('cname', 'certificate bound');

  return {
    success: true,
    message: `Certificate for ${mainDomain} (${domains.length} domain(s)) obtained and bound to OSS bucket ${bucket}`,
  };
}

export async function handler(
  _event: HandlerEvent | unknown,
  _context: HandlerContext | unknown
): Promise<HandlerResult> {
  log('handler', 'invoked');
  try {
    const outcome = await run();
    log('handler', 'success');
    return {
      statusCode: 200,
      body: JSON.stringify(outcome),
      headers: { 'Content-Type': 'application/json' },
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('Cert renewal failed:', message);
    if (err instanceof Error && err.stack) {
      console.error(err.stack);
    }
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: message }),
      headers: { 'Content-Type': 'application/json' },
    };
  }
}
