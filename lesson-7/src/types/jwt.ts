import type { JwtPayload } from "jsonwebtoken";

export interface JWTPayload extends JwtPayload {
  id: number;
  name: string;
  role: string;
}
