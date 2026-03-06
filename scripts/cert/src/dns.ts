/**
 * 阿里云云解析 DNS：为 ACME DNS-01 添加/删除 _acme-challenge.<domain> TXT 记录
 */
import Client, {
  AddDomainRecordRequest,
  DescribeDomainRecordsRequest,
  DeleteDomainRecordRequest,
} from '@alicloud/alidns20150109';
import { getCredentials } from './credentials.js';

const DEFAULT_REGION = 'cn-hangzhou';

export function parseChallengeDomain(identifier: string): {
  domainName: string;
  rr: string;
} {
  const lower = identifier.toLowerCase();
  const parts = lower.split('.');
  if (parts.length >= 2) {
    const domainName = parts.slice(-2).join('.');
    const rr =
      parts.length === 2
        ? '_acme-challenge'
        : `_acme-challenge.${parts.slice(0, -2).join('.')}`;
    return { domainName, rr };
  }
  return { domainName: lower, rr: '_acme-challenge' };
}

function createClient(): Client {
  const { accessKeyId, accessKeySecret, securityToken } = getCredentials();
  const config = {
    accessKeyId,
    accessKeySecret,
    regionId: DEFAULT_REGION,
    endpoint: 'alidns.aliyuncs.com',
    ...(securityToken && { securityToken }),
  };
  return new Client(config as ConstructorParameters<typeof Client>[0]);
}

export async function setTxt(identifier: string, value: string): Promise<void> {
  const client = createClient();
  const { domainName, rr } = parseChallengeDomain(identifier);
  console.log(`[dns] setTxt: domainName=${domainName} rr=${rr} value=${value}`);

  const listReq = new DescribeDomainRecordsRequest({
    domainName,
    RRKeyWord: '_acme-challenge',
    type: 'TXT',
    pageSize: 50,
  });
  const listRes = await client.describeDomainRecords(listReq);
  const records = listRes.body?.domainRecords?.record ?? [];
  console.log(`[dns] found ${records.length} existing _acme-challenge TXT records`);
  for (const rec of records) {
    if (rec.recordId) {
      console.log(`[dns] deleting old record: id=${rec.recordId} rr=${rec.RR} value=${rec.value}`);
      await client.deleteDomainRecord(
        new DeleteDomainRecordRequest({ recordId: rec.recordId })
      );
    }
  }

  console.log(`[dns] adding TXT record: ${rr}.${domainName} = ${value}`);
  await client.addDomainRecord(
    new AddDomainRecordRequest({
      domainName,
      RR: rr,
      type: 'TXT',
      value,
      TTL: 600,
    })
  );
  console.log('[dns] TXT record added');
}

export async function removeTxt(identifier: string): Promise<void> {
  const client = createClient();
  const { domainName, rr } = parseChallengeDomain(identifier);

  const listReq = new DescribeDomainRecordsRequest({
    domainName,
    RRKeyWord: rr.startsWith('_acme-challenge') ? '_acme-challenge' : rr,
    type: 'TXT',
    pageSize: 50,
  });
  const listRes = await client.describeDomainRecords(listReq);
  const records = listRes.body?.domainRecords?.record ?? [];
  for (const rec of records) {
    if (rec.recordId) {
      await client.deleteDomainRecord(
        new DeleteDomainRecordRequest({ recordId: rec.recordId })
      );
    }
  }
}
