import { AbstractControl, ValidatorFn } from '@angular/forms';

export function NotContainValidator(...keys: string[]): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any } | null => {
    if (!control || !control.parent) {
      return null;
    }

    const value: string = control.value;
    const controls = control.parent.controls as { [key: string]: AbstractControl };

    for (const key of keys) {
      const ctrl: AbstractControl = controls[key];

      if (ctrl && ctrl.value && value.toLowerCase().includes(ctrl.value.toLowerCase())) {
        return { notcontain: true };
      }
    }

    return null;
  };
}
