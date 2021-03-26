import { ContainValidator } from './contain-validator.validator';

describe('ValidatePasswordValidator', () => {
  it('should validate if expressions match', () => {
    const validator = ContainValidator('[A-Z]+');

    const result = validator({ value: 'Test' } as any);

    expect(result).toBe(null);
  });

  it('should not validate if expressions do not match', () => {
    const validator = ContainValidator('[A-Z]+');

    const result = validator({ value: 'test' } as any);

    expect(result).toEqual({ contain: true });
  });
});
