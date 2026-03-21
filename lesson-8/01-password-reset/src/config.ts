function getEnvironmentVariable(name: string, defaultValue?: string): string {
  const value = process.env[name] ?? defaultValue;

  if (value === undefined) {
    throw new Error(`Enrolment variable ${name} is required`);
  }

  return value;
}

const CONFIG = {
  jwtSecret: getEnvironmentVariable("JWT_SECRET"),
  jwtExpiresIn: getEnvironmentVariable("JWT_EXPIRES_IN", "7d"),
  smtpHost: getEnvironmentVariable("SMTP_HOST"),
  smtpPort: Number.parseInt(getEnvironmentVariable("SMTP_PORT"), 10),
  smtpAuthUser: getEnvironmentVariable("SMTP_AUTH_USER"),
  smtpAuthPass: getEnvironmentVariable("SMTP_AUTH_PASS"),
  senderEmail: getEnvironmentVariable("SENDER_EMAIL"),
};

export default CONFIG;
