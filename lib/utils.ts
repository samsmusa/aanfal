import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function Url(path: string): string {
    const currentUrl = new URL(window.location.href);

    const newUrl = new URL(path, window.location.origin);

    currentUrl.searchParams.forEach((value, key) => {
        newUrl.searchParams.append(key, value);
    });

    return newUrl.toString();
}
