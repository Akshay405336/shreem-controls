export class AuthError extends Error {
  public readonly statusCode: number;
  public readonly code: string;

  constructor(message: string, statusCode = 400, code = "AUTH_ERROR") {
    super(message);
    this.name = "AuthError";
    this.statusCode = statusCode;
    this.code = code;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class InvalidCredentialsError extends AuthError {
  constructor(message = "Invalid email or password.") {
    super(message, 401, "INVALID_CREDENTIALS");
  }
}

export class InactiveAccountError extends AuthError {
  constructor(message = "This admin account is currently inactive.") {
    super(message, 403, "ACCOUNT_INACTIVE");
  }
}

export class InvalidTokenError extends AuthError {
  constructor(message = "Invalid or malformed authentication token.") {
    super(message, 401, "INVALID_TOKEN");
  }
}

export class TokenExpiredError extends AuthError {
  constructor(message = "Authentication token has expired.") {
    super(message, 401, "TOKEN_EXPIRED");
  }
}

export class SessionExpiredError extends AuthError {
  constructor(message = "Session has expired. Please log in again.") {
    super(message, 401, "SESSION_EXPIRED");
  }
}

export class SessionRevokedError extends AuthError {
  constructor(message = "Session has been revoked.") {
    super(message, 401, "SESSION_REVOKED");
  }
}

export class TokenReuseDetectedError extends AuthError {
  constructor(
    message = "Security alert: token reuse detected. All associated sessions have been revoked.",
  ) {
    super(message, 401, "TOKEN_REUSE_DETECTED");
  }
}

export class RateLimitExceededError extends AuthError {
  constructor(
    message = "Too many login attempts. Please wait a few minutes before trying again.",
  ) {
    super(message, 429, "RATE_LIMIT_EXCEEDED");
  }
}

export class UnauthorizedError extends AuthError {
  constructor(message = "Authentication required.") {
    super(message, 401, "UNAUTHORIZED");
  }
}

export class ForbiddenError extends AuthError {
  constructor(message = "Insufficient permissions.") {
    super(message, 403, "FORBIDDEN");
  }
}
