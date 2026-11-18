import { RateLimitExceededError } from "../domain/errors";

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

class InMemoryRateLimiter {
  private records = new Map<string, RateLimitRecord>();

  /**
   * @param maxAttempts Maximum attempts within the window
   * @param windowMs Window in milliseconds
   */
  constructor(
    private maxAttempts = 5,
    private windowMs = 15 * 60 * 1000, // 15 minutes
  ) {}

  public check(key: string): void {
    const now = Date.now();
    const record = this.records.get(key);

    if (!record || now > record.resetAt) {
      return;
    }

    if (record.count >= this.maxAttempts) {
      throw new RateLimitExceededError();
    }
  }

  public hit(key: string): void {
    const now = Date.now();
    const record = this.records.get(key);

    if (!record || now > record.resetAt) {
      this.records.set(key, {
        count: 1,
        resetAt: now + this.windowMs,
      });
      return;
    }

    record.count += 1;
    this.records.set(key, record);
  }

  public reset(key: string): void {
    this.records.delete(key);
  }

  public clear(): void {
    this.records.clear();
  }
}

// Global login rate limiter instance
export const loginRateLimiter = new InMemoryRateLimiter(5, 15 * 60 * 1000);
