export const comparePassword = async (password: string, hashedPassword: string) => {
  return (await hashPassword(password)) === hashedPassword;
};

async function hashPassword(password: string) {
  const arrayBuffer = await crypto.subtle.digest(
    "SHA-512",
    new TextEncoder().encode(password)
  );

  const hashedPasswordString = Buffer.from(arrayBuffer).toString("base64");

  return hashedPasswordString;
}
