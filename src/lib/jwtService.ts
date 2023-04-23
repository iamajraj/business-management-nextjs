import { SignJWT, jwtVerify, type JWTPayload } from "jose";

export const SECRET_JWT = process.env.SECRET_JWT ?? "";

export type PayloadType = {
  id: string;
  name: string;
  email: string;
  user_type: string;
};

export async function sign(payload: PayloadType): Promise<string> {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60 * 24 * 30;

  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(SECRET_JWT));
}

export async function verify(token: string): Promise<PayloadType> {
  const { payload } = await jwtVerify(
    token,
    new TextEncoder().encode(SECRET_JWT)
  );
  return payload as PayloadType;
}
