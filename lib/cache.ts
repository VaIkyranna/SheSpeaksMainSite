interface CacheItem<T> {
  data: T;
  timestamp: number;
}

// Function to check if a date is from a different day
const isNewDay = (timestamp: number): boolean => {
  const date = new Date(timestamp)
  const now = new Date()
  return (
    date.getFullYear() !== now.getFullYear() ||
    date.getMonth() !== now.getMonth() ||
    date.getDate() !== now.getDate()
  )
}

class CacheManager {
  private static instance: CacheManager;
  private cache: Map<string, CacheItem<unknown>>;

  private constructor() {
    this.cache = new Map();
    // Clean up expired cache items every hour
    setInterval(() => this.cleanup(), 60 * 60 * 1000);
  }

  public static getInstance(): CacheManager {
    if (!CacheManager.instance) {
      CacheManager.instance = new CacheManager();
    }
    return CacheManager.instance;
  }

  public get<T>(key: string): T | null {
    const item = this.cache.get(key) as CacheItem<T> | undefined;
    if (!item) return null;

    // Check if it's a new day
    if (isNewDay(item.timestamp)) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  public set<T>(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  public delete(key: string): void {
    this.cache.delete(key);
  }

  public clear(): void {
    this.cache.clear();
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (isNewDay(item.timestamp)) {
        this.cache.delete(key);
      }
    }
  }
}

export const cache = CacheManager.getInstance();
