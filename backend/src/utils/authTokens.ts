import { JWT_DEFAULT_CONFIG } from "../config/jwtConfig.js";
import type { AccessTokenPayload, RefreshTokenPayload } from "../types/tokens.types.js";
import type { jwtTypes } from "../types/jwt.types.js";
import jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";

export class authTokens {
  private readonly config;

  constructor(config?: Partial<jwtTypes>) {
    this.config = {
      ...JWT_DEFAULT_CONFIG,
      ...config,
    };
  }

  getAccessToken(userId: string, email?: string) {
    const now = Math.floor(Date.now() / 1000); 

    const payload: AccessTokenPayload = {
      sub: userId,
      email, 
      iat: now, 
      exp: now + this.config.accessTokenTTL, 
      tokenType: "access", 
    };

    const options: SignOptions = {
      algorithm: "HS256",
    };

    if (this.config.issuer) {
      options.issuer = this.config.issuer;
    }

    if (this.config.audience) {
      options.audience = this.config.audience;
    }
    return jwt.sign(payload, this.config.secret, options);
  }

  getRefreshToken(userId: string) {
    const now = Math.floor(Date.now() / 1000);
    const refreshToken : RefreshTokenPayload = {
        sub: userId,
        iat: now,
        exp: 604800,
        tokenType: 'refresh'
    } 
    
    return refreshToken;
  }

}
