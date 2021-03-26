import { AbstractControl } from '@angular/forms';
import { VerifyPasswordValidator } from './verify-password-validator.validator';

describe('VerifyPasswordValidator', () => {
  it('should validate when control input matches source', () => {
    const validator = VerifyPasswordValidator('password');

    const result = validator(({
      value: 'password',
      parent: {
        get: () => ({
          value: 'password',
        }),
      },
    } as unknown) as AbstractControl);

    expect(result).toBe(null);
  });

  it('should not validate when control input does not matches source', () => {
    const validator = VerifyPasswordValidator('password');

    const result = validator(({
      value: 'password',
      parent: {
        get: () => ({
          value: 'passwOrd',
        }),
      },
    } as unknown) as AbstractControl);

    expect(result).toEqual({ mismatch: true });
  });
});
