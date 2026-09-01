export interface DateTimeParts {
    date: string;
    time: string;
}

export async function getInfoFromIp(): Promise<DateTimeParts | null> {
    try {
        const response = await fetch('https://get.geojs.io/v1/ip/geo.json');
        const data = await response.json();
        const currentTime = new Date().toLocaleString('en-US', {timeZone: data.timezone});
        const [date, time] = currentTime.split(', ');
        return {date, time};
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function getTimeZone(): Promise<string | null> {
    try {
        const response = await fetch('https://get.geojs.io/v1/ip/geo.json');
        const data = await response.json();
        return data.timezone ?? null;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getTimeDateFormatted(): Promise<DateTimeParts | null> {
    const timeZone = await getTimeZone();

    if (!timeZone) {
        console.error('Unable to retrieve timezone.');
        return null;
    }

    const currentDate = new Date();

    const formattedDate = new Intl.DateTimeFormat('en-GB', {
        timeZone,
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }).format(currentDate);

    const formattedTime = new Intl.DateTimeFormat('en-GB', {
        timeZone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    }).format(currentDate);

    return {date: formattedDate, time: formattedTime};
}

export function getUnixTime(): number {
    return Math.floor(Date.now() / 1000);
}

export function getTimeDifference(thermometerUnixTimestamp: number, currentUnixTime: number): string {
    const timeDifferenceInSeconds = currentUnixTime - thermometerUnixTimestamp;

    if (timeDifferenceInSeconds < 0) return 'error';

    const days = Math.floor(timeDifferenceInSeconds / (3600 * 24));
    const hours = Math.floor((timeDifferenceInSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((timeDifferenceInSeconds % 3600) / 60);

    if (days > 0) return `${days} days, ${hours} hours`;
    if (hours > 0) return `${hours} hours, ${minutes} minutes`;
    return `${minutes} minutes`;
}

export function addOneSecond(inputTime: string): string {
    const timeParts = inputTime.split(':');

    let hours = parseInt(timeParts[0], 10);
    let minutes = parseInt(timeParts[1], 10);
    let seconds = parseInt(timeParts[2], 10);

    if (Number.isNaN(hours) || Number.isNaN(minutes) || Number.isNaN(seconds)) {
        return 'Invalid input format or values';
    }

    seconds += 1;

    if (seconds >= 60) {
        seconds = 0;
        minutes += 1;
    }
    if (minutes >= 60) {
        minutes = 0;
        hours += 1;
    }
    if (hours >= 24) {
        hours = 0;
    }

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export function unixToPolishTime(unixTimestamp: number): string {
    const date = new Date(unixTimestamp * 1000);

    const formattedDate = date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    const formattedTime = date.toLocaleTimeString('pl-PL', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });

    return `${formattedDate} ${formattedTime}`;
}

export function calculateAge(day: number, month: number, year: number): number {
    const today = new Date();
    const birthDate = new Date(year, month - 1, day);

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
        age--;
    }

    return age;
}
