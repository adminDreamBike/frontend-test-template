import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs))
}

export function getBaseUrl() {
  // Client-side: use relative path
  if (typeof window !== 'undefined') return '';
  
  // Server-side on Vercel: use VERCEL_URL
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  
  // Local development
  return 'http://localhost:3000';
}