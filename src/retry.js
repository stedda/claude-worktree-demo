import { setTimeout as sleep } from 'node:timers/promises';

export async function retry(operation, { attempts = 3, delayMs = 10 } = {}) {
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      if (attempt === attempts) throw error;
      await sleep(delayMs);
    }
  }
}
