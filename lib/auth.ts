export default async function requireAuth() {
  return true;
}

// Named export for compatibility (will be removed when refactoring auth)
export function requireAuthNamed() {
  return null;
}

