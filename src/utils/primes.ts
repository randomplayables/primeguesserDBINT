export function isPrime(n: number): boolean {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  const limit = Math.sqrt(n);
  for (let i = 3; i <= limit; i += 2) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}

export function generateRandomPrime(min: number, max: number): number {
  if (min > max) {
    throw new Error('Minimum value cannot be greater than maximum value.');
  }
  const primes: number[] = [];
  for (let i = min; i <= max; i++) {
    if (isPrime(i)) {
      primes.push(i);
    }
  }
  if (primes.length === 0) {
    throw new Error(`No prime numbers found in the range ${min} to ${max}.`);
  }
  const randomIndex = Math.floor(Math.random() * primes.length);
  return primes[randomIndex];
}