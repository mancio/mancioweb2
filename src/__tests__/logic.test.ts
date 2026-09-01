import {batteryPercentage, getFlour, getHydration, getWater, numberToEmoji, roundStringToTwoDecimals} from "../logic/math";
import {addOneSecond, calculateAge, getTimeDifference} from "../logic/time";

describe('dough calculations', () => {
    test('hydration is water over flour as a percentage', () => {
        expect(getHydration(390, 600)).toBe(65);
    });

    test('flour is derived from hydration and water', () => {
        expect(getFlour(65, 390)).toBe(600);
    });

    test('water is derived from hydration and flour', () => {
        expect(getWater(65, 600)).toBe(390);
    });

    test('the three calculations are mutually consistent', () => {
        const flour = 1000;
        const hydration = 70;
        const water = getWater(hydration, flour);
        expect(getHydration(water, flour)).toBe(hydration);
        expect(getFlour(hydration, water)).toBe(flour);
    });
});

describe('batteryPercentage', () => {
    test('clamps at the maximum voltage', () => {
        expect(batteryPercentage('5.50')).toBe('100.00%');
    });

    test('clamps at the minimum voltage', () => {
        expect(batteryPercentage('4.00')).toBe('0.00%');
    });

    test('interpolates in between', () => {
        expect(batteryPercentage('5.00')).toBe('50.00%');
    });
});

describe('roundStringToTwoDecimals', () => {
    test('formats to exactly two decimals', () => {
        expect(roundStringToTwoDecimals('21.456')).toBe('21.46');
        expect(roundStringToTwoDecimals('7')).toBe('7.00');
    });
});

describe('numberToEmoji', () => {
    test('maps single digits', () => {
        expect(numberToEmoji(3)).toBe('❸');
    });

    test('maps ten as a single glyph', () => {
        expect(numberToEmoji(10)).toBe('❿');
    });

    test('maps multi digit numbers digit by digit', () => {
        expect(numberToEmoji(12)).toBe('❶❷');
    });
});

describe('addOneSecond', () => {
    test('increments seconds', () => {
        expect(addOneSecond('10:20:30')).toBe('10:20:31');
    });

    test('rolls over into the next minute', () => {
        expect(addOneSecond('10:20:59')).toBe('10:21:00');
    });

    test('rolls over into the next hour', () => {
        expect(addOneSecond('10:59:59')).toBe('11:00:00');
    });

    test('wraps around midnight', () => {
        expect(addOneSecond('23:59:59')).toBe('00:00:00');
    });

    test('reports invalid input', () => {
        expect(addOneSecond('not a time')).toBe('Invalid input format or values');
    });
});

describe('getTimeDifference', () => {
    test('reports minutes below an hour', () => {
        expect(getTimeDifference(0, 60 * 30)).toBe('30 minutes');
    });

    test('reports hours and minutes below a day', () => {
        expect(getTimeDifference(0, 3600 * 5 + 60 * 20)).toBe('5 hours, 20 minutes');
    });

    test('reports days and hours beyond a day', () => {
        expect(getTimeDifference(0, 3600 * 24 * 2 + 3600 * 3)).toBe('2 days, 3 hours');
    });

    test('reports an error for a future timestamp', () => {
        expect(getTimeDifference(100, 50)).toBe('error');
    });
});

describe('calculateAge', () => {
    test('counts full years elapsed', () => {
        const today = new Date();
        const age = calculateAge(today.getDate(), today.getMonth() + 1, today.getFullYear() - 30);
        expect(age).toBe(30);
    });

    test('does not count a birthday that has not happened yet', () => {
        const today = new Date();
        const tomorrow = new Date(today.getTime() + 24 * 3600 * 1000);
        const age = calculateAge(tomorrow.getDate(), tomorrow.getMonth() + 1, tomorrow.getFullYear() - 30);
        expect(age).toBe(29);
    });
});
