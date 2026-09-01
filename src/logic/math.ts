export function roundStringToTwoDecimals(strNum: string): string {
    return parseFloat(strNum).toFixed(2);
}

export function batteryPercentage(voltageStr: string): string {
    const voltage = parseFloat(voltageStr);
    const MAX_VOLTAGE = 5.20;
    const MIN_VOLTAGE = 4.80;
    const clampedVoltage = Math.max(MIN_VOLTAGE, Math.min(MAX_VOLTAGE, voltage));
    const percentage = ((clampedVoltage - MIN_VOLTAGE) / (MAX_VOLTAGE - MIN_VOLTAGE)) * 100;
    return `${percentage.toFixed(2)}%`;
}

export const getRandomNumber = (min = 1, max = 6): number => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

export function getRealRandomInt(min = 1, max = 6): number {
    const range = max - min + 1;
    const randomArray = new Uint32Array(1);
    window.crypto.getRandomValues(randomArray);
    return min + (randomArray[0] % range);
}

const EMOJI_DIGITS: Record<string, string> = {
    '1': '❶',
    '2': '❷',
    '3': '❸',
    '4': '❹',
    '5': '❺',
    '6': '❻',
    '7': '❼',
    '8': '❽',
    '9': '❾',
    '10': '❿',
};

export function numberToEmoji(number: number | string): string {
    const numStr = number.toString();
    if (numStr === '10') return EMOJI_DIGITS[numStr];
    return numStr.split('').map(digit => EMOJI_DIGITS[digit] ?? digit).join('');
}

export function getHydration(water: number, flour: number): number {
    return Math.round((water / flour) * 100);
}

export function getFlour(hydration: number, water: number): number {
    return Math.round((100 * water) / hydration);
}

export function getWater(hydration: number, flour: number): number {
    return Math.round((hydration / 100) * flour);
}
