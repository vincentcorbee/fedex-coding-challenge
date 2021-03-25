import { VerifyPasswordValidator } from './verify-password-validator.validator';

describe('VerifyPasswordValidator', () => {
  it('should create an instance', () => {
    const validator = VerifyPasswordValidator('');
    expect(validator).toBeTruthy();
  });
});
