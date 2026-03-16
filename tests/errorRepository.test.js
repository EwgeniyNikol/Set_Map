import ErrorRepository from '../src/js/ErrorRepository';

describe('ErrorRepository class', () => {
  let errorRepo;

  beforeEach(() => {
    errorRepo = new ErrorRepository();
  });

  describe('Initialization', () => {
    test('should create Map with 7 errors', () => {
      expect(errorRepo.errors).toBeInstanceOf(Map);
      expect(errorRepo.errors.size).toBe(7);
    });

    test('should have correct error codes', () => {
      const codes = [400, 401, 403, 404, 500, 502, 503];
      codes.forEach((code) => {
        expect(errorRepo.errors.has(code)).toBe(true);
      });
    });
  });

  describe('translate method for existing codes', () => {
    test('should return correct message for 4xx errors', () => {
      expect(errorRepo.translate(400)).toBe('Bad Request');
      expect(errorRepo.translate(401)).toBe('Unauthorized');
      expect(errorRepo.translate(403)).toBe('Forbidden');
      expect(errorRepo.translate(404)).toBe('Not Found');
    });

    test('should return correct message for 5xx errors', () => {
      expect(errorRepo.translate(500)).toBe('Internal Server Error');
      expect(errorRepo.translate(502)).toBe('Bad Gateway');
      expect(errorRepo.translate(503)).toBe('Service Unavailable');
    });
  });

  describe('translate method for non-existent codes', () => {
    test('should return "Unknown error" for invalid numeric codes', () => {
      expect(errorRepo.translate(999)).toBe('Unknown error');
      expect(errorRepo.translate(1000)).toBe('Unknown error');
      expect(errorRepo.translate(-1)).toBe('Unknown error');
    });

    test('should return "Unknown error" for invalid input types', () => {
      expect(errorRepo.translate('400')).toBe('Unknown error');
      expect(errorRepo.translate(null)).toBe('Unknown error');
      expect(errorRepo.translate(undefined)).toBe('Unknown error');
      expect(errorRepo.translate({})).toBe('Unknown error');
      expect(errorRepo.translate([])).toBe('Unknown error');
    });
  });

  describe('Edge cases', () => {
    test('should handle boundary values', () => {
      expect(errorRepo.translate(0)).toBe('Unknown error');
      expect(errorRepo.translate(9999)).toBe('Unknown error');
    });

    test('should not modify original Map', () => {
      const originalSize = errorRepo.errors.size;
      errorRepo.translate(999);
      expect(errorRepo.errors.size).toBe(originalSize);
    });
  });
});
