import {useEffect} from "react";
import {DESKTOP, PHONE, TABLET} from "./Names";

export type DisplayType = typeof PHONE | typeof TABLET | typeof DESKTOP;

export function isPhoneInVerticalOrientation(): boolean {
    const maxWidthForPhone = 480;
    const width = window.innerWidth;
    const height = window.innerHeight;

    return width <= maxWidthForPhone && height > width;
}

export function getDisplayType(): DisplayType {
    const width = window.innerWidth;

    if (width <= 768) return PHONE;
    if (width <= 1024) return TABLET;
    return DESKTOP;
}

export function useRefreshOnDisplayChange(): void {
    useEffect(() => {
        const handleOrientationChange = () => {
            window.location.reload();
        };

        window.addEventListener('orientationchange', handleOrientationChange);

        return () => {
            window.removeEventListener('orientationchange', handleOrientationChange);
        };
    }, []);
}

export function isTouchDevice(): boolean {
    return navigator.maxTouchPoints > 0;
}

export function getEmoji(): string {
    const emojis = ['😊', '🎉', '🌟', '🐶', '🍕'];
    return emojis[Math.floor(Math.random() * emojis.length)];
}

export function getFileNameNoExt(file: string): string {
    return file.split("/").pop()!.split(".")[0];
}
