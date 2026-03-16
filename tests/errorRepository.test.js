import ErrorRepository from '../src/js/ErrorRepository';

describe('ErrorRepository class', () => {
  let errorRepo;

  beforeEach(() => {
    errorRepo = new ErrorRepository();
  });

  test('should create Map with errors', () => {
    expect(errorRepo.errors).toBeInstanceOf(Map);
    expect(errorRepo.errors.size).toBe(7);
  });

  test('translate should return correct message for existing codes', () => {
    expect(errorRepo.translate(400)).toBe('Bad Request');
    expect(errorRepo.translate(401)).toBe('Unauthorized');
    expect(errorRepo.translate(403)).toBe('Forbidden');
    expect(errorRepo.translate(404)).toBe('Not Found');
    expect(errorRepo.translate(500)).toBe('Internal Server Error');
    expect(errorRepo.translate(502)).toBe('Bad Gateway');
    expect(errorRepo.translate(503)).toBe('Service Unavailable');
  });

  test('translate should return "Unknown error" for non-existent code', () => {
    expect(errorRepo.translate(999)).toBe('Unknown error');
    expect(errorRepo.translate(1000)).toBe('Unknown error');
    expect(errorRepo.translate(-1)).toBe('Unknown error');
  });

  test('translate should handle invalid input types', () => {
    expect(errorRepo.translate('400')).toBe('Unknown error');
    expect(errorRepo.translate(null)).toBe('Unknown error');
    expect(errorRepo.translate(undefined)).toBe('Unknown error');
  });
});
