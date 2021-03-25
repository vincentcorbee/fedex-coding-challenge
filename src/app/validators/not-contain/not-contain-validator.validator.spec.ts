import { NotContainValidator } from './not-contain-validator.validator';

describe('ValidatePasswordValidator', () => {
  it('should create an instance', () => {
    const validator = NotContainValidator();
    expect(validator).toBeTruthy();
  });
});
