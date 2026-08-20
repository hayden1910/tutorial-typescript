export const PI = 3.14159265358979323846;

export function getCircumference(radius: number): number {
    return 2 * PI * radius;
}

export function getArea(radius: number): number {
    return PI * radius * radius;
}

export function getVolume(radius: number): number {
    return (4 / 3) * PI * radius * radius * radius;
}

export { };
