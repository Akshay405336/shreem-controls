export type AdminRole = "SUPER_ADMIN";

export interface AdminUserDto {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  isActive: boolean;
  isBootstrapManaged: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt: Date | null;
}

export interface AdminSafeUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
}

export interface AdminSessionDto {
  id: string;
  adminUserId: string;
  expiresAt: Date;
  refreshExpiresAt: Date;
  revokedAt: Date | null;
  lastUsedAt: Date;
  createdAt: Date;
  userAgent?: string | null;
  ipAddress?: string | null;
}

export interface AccessTokenPayload {
  sub: string; // admin user id
  sessionId: string;
  role: AdminRole;
  email: string;
  name: string;
  exp?: number;
  iat?: number;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  accessExpiresAt: Date;
  refreshExpiresAt: Date;
}

export interface LoginResult {
  admin: AdminSafeUser;
  tokens: AuthTokens;
  sessionId: string;
}

export interface RefreshResult {
  admin: AdminSafeUser;
  tokens: AuthTokens;
  sessionId: string;
}
