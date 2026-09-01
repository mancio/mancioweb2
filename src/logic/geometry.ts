export interface Position {
    x: number;
    y: number;
}

export interface Distance {
    disX: number;
    distY: number;
}

export function genRandPos(px: number): Position {
    return {
        x: Math.random() * (window.innerWidth - px),
        y: Math.random() * (window.innerHeight - px),
    };
}

export function genRandDeg(): number {
    return Math.random() * 360;
}

export function getRadians(deg: number): number {
    return deg * (Math.PI / 180);
}

export function getDistance(rad: number): Distance {
    const deltaX = Math.cos(rad);
    const deltaY = Math.sin(rad);
    return {disX: deltaX * window.innerWidth, distY: deltaY * window.innerHeight};
}

export function getNewPos(position: Position): Position {
    const deg = genRandDeg();
    const rad = getRadians(deg);
    const distance = getDistance(rad);
    return {x: position.x + distance.disX, y: position.y + distance.distY};
}

export function newBorder(position: Position, px: number): Position {
    const borderX = position.x < 0 ? 0 : position.x > window.innerWidth - px ? window.innerWidth - px : position.x;
    const borderY = position.y < 0 ? 0 : position.y > window.innerHeight - px ? window.innerHeight - px : position.y;
    return {x: borderX, y: borderY};
}

export function isTouching(position: Position, px: number): boolean {
    return position.x < 0 || position.x > window.innerWidth - px || position.y < 0 || position.y > window.innerHeight - px;
}

export function getRelativeSize(percentage: number): number {
    const screenArea = window.innerWidth * window.innerHeight;
    const objectArea = (percentage / 100) * screenArea;
    return Math.sqrt(objectArea);
}

export function fpsToMs(fps: number): number {
    return 1000 / fps;
}
