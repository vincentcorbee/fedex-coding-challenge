import { ContainValidator } from './contain-validator.validator';

describe('ValidatePasswordValidator', () => {
  it('should create an instance', () => {
    const validator = ContainValidator();
    expect(validator).toBeTruthy();
  });
});
