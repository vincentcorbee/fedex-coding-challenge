import { AbstractControl, ValidatorFn } from '@angular/forms';

export function VerifyPasswordValidator(key: string): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any } | null => {
    if (!control || !control.parent) {
      return null;
    }

    const passwordControl = control.parent.get(key);

    return !passwordControl || (passwordControl.value && passwordControl.value !== control.value) ? { mismatch: true } : null;
  };
}
