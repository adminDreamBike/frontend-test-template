import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs))
}

export function getBaseUrl() {
    if (typeof window !== 'undefined') {
        return ''
    }

    if (process.env.VERCEL_URL) {
        return `http://${process.env.VERCEL_URL}`
    }

    return `http://localhost:${process.env.PORT ?? 3000}`
}