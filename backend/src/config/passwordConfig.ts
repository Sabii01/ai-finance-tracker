export interface argonConfig {
  memoryCost: number;
  timeCost: number;
  parallelism: number;
}

export interface passwordConfig {
  minLength: number;
  maxLength: number;
}

export const DEFAULT_ARGON_CONFIG: argonConfig = {
  memoryCost: 2 ** 16, 
  timeCost: 3,         
  parallelism: 4,      
} as const;

export const DEFAULT_PASSWORD_CONFIG: passwordConfig = {
  minLength: 8,   
  maxLength: 128,
} as const;