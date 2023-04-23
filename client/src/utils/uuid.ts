export function uuid(): string {
  return Math.random().toString(32).substr(2,9);
}