/**
 * 阿里云凭证：从 FC 角色注入的环境变量或手动配置的环境变量中获取 AK/SK/STS Token
 */
export interface AliyunCredentials {
  accessKeyId: string;
  accessKeySecret: string;
  securityToken?: string;
}

export function getCredentials(): AliyunCredentials {
  const accessKeyId =
    process.env.ACS_ACCESS_KEY_ID ||
    process.env.ALIBABA_CLOUD_ACCESS_KEY_ID ||
    '';
  const accessKeySecret =
    process.env.ACS_ACCESS_KEY_SECRET ||
    process.env.ALIBABA_CLOUD_ACCESS_KEY_SECRET ||
    '';
  const securityToken =
    process.env.ACS_SECURITY_TOKEN ||
    process.env.ALIBABA_CLOUD_SECURITY_TOKEN;
  if (!accessKeyId || !accessKeySecret) {
    throw new Error(
      'Missing credentials: set ACS_ACCESS_KEY_ID/ACS_ACCESS_KEY_SECRET (FC role) or ALIBABA_CLOUD_ACCESS_KEY_ID/ALIBABA_CLOUD_ACCESS_KEY_SECRET'
    );
  }
  return { accessKeyId, accessKeySecret, securityToken };
}
