import pkg from "jsonwebtoken";
const { sign, verify } = pkg;

export const createToken = (
  userData: { email: string; _id: string },
  options: pkg.SignOptions
) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("secret key not found!!!");
  const accessToken = sign(userData, secret, { ...options });
  return accessToken;
};

export const decodeJwt = (token: string) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("secret key not found!!!");
  const tokenData = verify(token, secret);
  return tokenData;
};

export const generatecontainerToken = (
  userData: {
    email: string;
    containerId?: string;
    _id?: string;
  },
  config = {}
) => {
  const secret = process.env.CONTAINER_ENC_SECRET;

  if (!secret) throw new Error("secret key not found!!!");
  const accessToken = sign(userData, secret, { ...config });
  return accessToken;
};

export const decodecontainerToken = (token: string) => {
  const secret = process.env.CONTAINER_ENC_SECRET;

  if (!secret) throw new Error("secret key not found!!!");
  const tokenData = verify(token, secret);
  return tokenData;
};
