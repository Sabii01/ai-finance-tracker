  export interface AccessTokenPayload {
    sub: string;
    email?: string | undefined;
    iat: number;
    exp: number; 
    tokenType: 'access';
  }

  export const DEFAULT_RT_EXP = Date.now() + 7 * 24 * 60 * 60 * 1000;

  /**
   * JWT Refresh Token Payload.
   * Contains minimal data, mostly for identification.
   */
  export interface RefreshTokenPayload {
    sub: string; 
    jti?: string;
    iat: number;
    exp: number;
    tokenType: 'refresh';
  }


  export interface VerifiedToken {
    payload: AccessTokenPayload | RefreshTokenPayload;
    isExpired: boolean;
  }

  /**
   * Options for token verification.
   */
  export interface TokenVerificationOptions {
    ignoreExpiration?: boolean; // idk why we add this, I just added because I saw someone do it.
    requiredTokenType?: 'access' | 'refresh';
  }