function getEnvironmentVariable(name: string, defaultValue?: string): string {
  const value = process.env[name] ?? defaultValue;

  if (value === undefined) {
    throw new Error(`Environment variable ${name} is required`);
  }

  return value;
}

const CONFIG = {
  jwtSecret: getEnvironmentVariable("JWT_SECRET"),
  jwtExpiresIn: getEnvironmentVariable("JWT_EXPIRES_IN", "7d"),
};

export default CONFIG;
