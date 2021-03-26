import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import {
  UsersService,
  UsersServiceResponse,
} from 'src/app/services/users.service';
import {
  NotContainValidator,
  ContainValidator,
  VerifyPasswordValidator,
} from 'src/app/validators';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
})
export class SignupFormComponent {
  showPassword = false;
  showVerifyPassword = false;
  signupForm: FormGroup;
  loading = false;
  success = false;
  error = '';

  constructor(private usersService: UsersService) {
    this.signupForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        ContainValidator('[A-Z]+', '[a-z]+'),
        NotContainValidator('firstName', 'lastName'),
      ]),
      verify_password: new FormControl('', [
        Validators.required,
        VerifyPasswordValidator('password'),
      ]),
    });
  }

  onSubmit(): void {
    for (const control of Object.values(this.signupForm.controls)) {
      control.updateValueAndValidity();
    }

    if (this.signupForm.valid) {
      const { firstName, lastName, email, password } = this.signupForm.value;

      this.loading = true;

      this.usersService
        .addUser({ firstName, lastName, email, password })
        .pipe(finalize(() => (this.loading = false)))
        .subscribe((response: UsersServiceResponse) => {
          if (response.error) {
            this.error = response.error.msg;
          } else {
            this.success = true;
            this.error = '';
          }
        });
    }
  }

  getError(controlName: string): string[] {
    const control = this.signupForm.get(controlName);

    // Return the first validation error in an array
    return control ? Object.keys(control.errors || {}).slice(0, 1) : [];
  }
}
