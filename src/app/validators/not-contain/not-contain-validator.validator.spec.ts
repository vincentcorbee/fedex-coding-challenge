import { AbstractControl } from '@angular/forms';
import { NotContainValidator } from './not-contain-validator.validator';

describe('ValidatePasswordValidator', () => {
  it('should validate when input does not contain field values', () => {
    const validator = NotContainValidator('firstName');

    const result = validator(({
      value: 'password',
      parent: {
        controls: {
          firstName: {
            value: 'test',
          },
        },
      },
    } as unknown) as AbstractControl);

    expect(result).toBe(null);
  });

  it('should not validate when input does contain field values', () => {
    const validator = NotContainValidator('firstName');

    const result = validator(({
      value: 'password',
      parent: {
        controls: {
          firstName: {
            value: 'pass',
          },
        },
      },
    } as unknown) as AbstractControl);

    expect(result).toEqual({ notcontain: true });
  });
});
