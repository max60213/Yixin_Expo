'use client';
import { Link as NavLink, useRouter, usePathname } from 'expo-router';

export function Link({ href, children, ...props }: { href: string; children: React.ReactNode } & Record<string, unknown>): React.ReactElement {
  return <NavLink href={href} {...props as any}>{children}</NavLink>;
}

export { useRouter, usePathname } from 'expo-router';

export default Link;
