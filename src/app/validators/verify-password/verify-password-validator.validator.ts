import { AbstractControl, ValidatorFn } from '@angular/forms';

export function VerifyPasswordValidator(key: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control || !control.parent) {
      return null;
    }

    const matcherControl = control.parent.get(key);

    return !matcherControl ||
      (matcherControl.value && matcherControl.value !== control.value)
      ? { mismatch: true }
      : null;
  };
}
