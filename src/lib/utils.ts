import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * shadcn/ui 標準 className 合併工具：先用 clsx 組裝，再用 tailwind-merge 去除衝突樣式。
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
