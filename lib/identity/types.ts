export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  fullName: string;
  email: string;
  password: string;
};

export type User = {
  id: string;
  fullName: string;
  email: string;
  plan: string;
  createdAt: string;
  isActive: boolean;
};

export type AuthToken = {
  token: string;
  expiresAt: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    displayName: string;
    tier: string;
  };
};