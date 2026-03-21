import type { JwtPayload } from "jsonwebtoken";

export interface ResetPasswordPayload extends JwtPayload {
  email: string;
}
