import { AbstractControl, ValidatorFn } from '@angular/forms';

export function ContainValidator(...patterns: string[]): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any } | null => {
    if (!control) {
      return null;
    }

    const value: string = control.value;

    for (const pattern of patterns) {
      const reg = new RegExp(pattern);

      if (!reg.test(value)) {
        return { contain: true };
      }
    }

    return null;
  };
}
