const requiredEnvVariables = [
  "MONGODB_URI",
  "GEMINI_API_KEY",
  "GEMINI_MODEL",
  "JWT_SECRET",
  "JWT_EXPIRES_IN",
  "BCRYPT_SALT_ROUNDS",
];

const validateEnvironment = (): void => {
  const missingVariables = requiredEnvVariables.filter(
    (variable) => !process.env[variable],
  );

  if (missingVariables.length > 0) {
    throw new Error(
      `Missing environment variables: ${missingVariables.join(", ")}`,
    );
  }
};

export default validateEnvironment;
