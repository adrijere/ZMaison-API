import { validateUserArrivalDate } from '../../src/middleware/validation';

describe('validateUserArrivalDate Tests', () => {
    test('should validate correct date format and valid date', () => {
        const result = validateUserArrivalDate('2023-04-01');
        expect(result.isCorrect).toBe(true);
    });

    test('should fail with empty string', () => {
        const result = validateUserArrivalDate('');
        expect(result.isCorrect).toBe(false);
        expect(result.errorMessage).toBe("arrivalDate is missing.");
    });

    test('should fail with invalid date', () => {
        const result = validateUserArrivalDate('2023/02/30');
        expect(result.isCorrect).toBe(false);
        expect(result.errorMessage).toBe("Incorrect Format Date for arrivalDate, Expected YYYY-MM-DD.");
    });

    test('should fail with incorrect date format', () => {
        const result = validateUserArrivalDate('01-04-2023');
        expect(result.isCorrect).toBe(false);
        expect(result.errorMessage).toBe("Incorrect Format Date for arrivalDate, Expected YYYY-MM-DD.");
    });

    test('should fail with non-date string', () => {
        const result = validateUserArrivalDate('not a date');
        expect(result.isCorrect).toBe(false);
        expect(result.errorMessage).toBe("Incorrect Format Date for arrivalDate, Expected YYYY-MM-DD.");
    });
});