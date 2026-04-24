export interface jwtTypes {
  secret: string;
  accessTokenTTL: number;
  issuedAt: Date;
  audience?: string | undefined;
  issuer?: string | undefined;
}

