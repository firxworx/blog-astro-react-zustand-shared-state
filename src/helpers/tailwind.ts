import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge classnames with thoughtful handling of tailwindcss classes by tailwind-merge
 * to support overrides and customizations.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
