import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { from } from 'rxjs';
import { User, UsersService } from 'src/app/services/users.service';

import { SignupFormComponent } from './signup-form.component';

const getErrorMessage = (matFormField: HTMLElement): string =>
  (matFormField.querySelector('mat-error')?.textContent || '').trim();

const getMatFormField = (host: HTMLElement, id: string): HTMLElement =>
  host.querySelector(`#${id}`) as HTMLElement;

const getInputField = (host: HTMLElement, name: string): HTMLInputElement =>
  host.querySelector(`[formControlName="${name}"]`) as HTMLInputElement;

const getSubmitButton = (host: HTMLElement): HTMLButtonElement =>
  host.querySelector('[type="submit"]') as HTMLButtonElement;

const triggerEvent = (el: HTMLInputElement, event = 'input'): boolean =>
  el.dispatchEvent(new Event(event));

const fillForm = (
  host: HTMLElement,
  fixture: ComponentFixture<SignupFormComponent>,
  data: User
): void => {
  const firstNameInput = getInputField(host, 'firstName');
  const lastNameInput = getInputField(host, 'lastName');
  const emailInput = getInputField(host, 'email');
  const passwordInput = getInputField(host, 'password');
  const verifyPasswordInput = getInputField(host, 'verify_password');
  firstNameInput.value = data.firstName;
  triggerEvent(firstNameInput);

  lastNameInput.value = data.lastName;
  triggerEvent(lastNameInput);

  emailInput.value = data.email;
  triggerEvent(emailInput);

  passwordInput.value = data.password;
  triggerEvent(passwordInput);

  verifyPasswordInput.value = data.password;
  triggerEvent(verifyPasswordInput);

  fixture.detectChanges();
};

describe('SignupFormComponent', () => {
  let component: SignupFormComponent;
  let fixture: ComponentFixture<SignupFormComponent>;
  let usersServiceSpy: jasmine.SpyObj<UsersService>;

  beforeEach(() => {
    const usersServiceMock = jasmine.createSpyObj('UsersService', ['addUser']);

    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [ReactiveFormsModule],
      declarations: [SignupFormComponent],
      providers: [{ provide: UsersService, useValue: usersServiceMock }],
    });

    fixture = TestBed.createComponent(SignupFormComponent);

    component = fixture.componentInstance;

    usersServiceSpy = TestBed.inject(
      UsersService
    ) as jasmine.SpyObj<UsersService>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('all errors messages should be shown when all fields are blank and user clicks the submit button', () => {
    const host: HTMLElement = fixture.nativeElement;
    const button = getSubmitButton(host);

    button.click();

    fixture.detectChanges();

    expect(host.querySelectorAll('mat-error').length).toBe(5);
  });

  it('password field should show error message when empty', () => {
    const host: HTMLElement = fixture.nativeElement;
    const matFormField = getMatFormField(host, 'password');
    const passwordInput = getInputField(host, 'password');

    triggerEvent(passwordInput, 'blur');

    fixture.detectChanges();

    expect(getErrorMessage(matFormField)).toBe('Password is required');
  });

  it('password field should show error message when password contains first name', () => {
    const host: HTMLElement = fixture.nativeElement;
    const matFormField = getMatFormField(host, 'password');
    const passwordInput = getInputField(host, 'password');
    const firstNameInput = getInputField(host, 'firstName');
    const firstName = 'Test';

    firstNameInput.value = firstName;

    triggerEvent(firstNameInput);

    passwordInput.value = firstName;

    triggerEvent(passwordInput);

    fixture.detectChanges();

    expect(getErrorMessage(matFormField)).toBe(
      'Password can not contain first name or last name'
    );
  });

  it('password field should show error message when password contains last name', () => {
    const host: HTMLElement = fixture.nativeElement;
    const matFormField = getMatFormField(host, 'password');
    const passwordInput = getInputField(host, 'password');
    const lastNameInput = getInputField(host, 'lastName');
    const lastName = 'Test';

    lastNameInput.value = lastName;

    triggerEvent(lastNameInput);

    passwordInput.value = lastName;

    triggerEvent(passwordInput);

    fixture.detectChanges();

    expect(getErrorMessage(matFormField)).toBe(
      'Password can not contain first name or last name'
    );
  });

  it('password field should show error message when password does not contain upper and lowercase letters', () => {
    const host: HTMLElement = fixture.nativeElement;
    const matFormField = getMatFormField(host, 'password');
    const passwordInput = getInputField(host, 'password');

    passwordInput.value = 'password';

    triggerEvent(passwordInput);

    fixture.detectChanges();

    expect(getErrorMessage(matFormField)).toBe(
      'Password must contain upper and lower case letters'
    );
  });

  it('password field should show error message when password is shorter then 8 characters', () => {
    const host: HTMLElement = fixture.nativeElement;
    const matFormField = getMatFormField(host, 'password');
    const passwordInput = getInputField(host, 'password');

    passwordInput.value = 'Toshort';

    triggerEvent(passwordInput);

    fixture.detectChanges();

    expect(getErrorMessage(matFormField)).toBe(
      'Password must be at least 8 characters'
    );
  });

  it('email field should show error message when email is not formated correctly', () => {
    const host: HTMLElement = fixture.nativeElement;
    const matFormField = getMatFormField(host, 'email');
    const emailInput = getInputField(host, 'email');

    emailInput.value = 'user@test._';

    triggerEvent(emailInput);

    fixture.detectChanges();

    expect(getErrorMessage(matFormField)).toBe('Please enter a valid email');
  });

  it('verification password field should show error message if value does not match password', () => {
    const host: HTMLElement = fixture.nativeElement;
    const matFormField = getMatFormField(host, 'verify_password');
    const passwordInput = getInputField(host, 'password');
    const verifyPasswordInput = getInputField(host, 'verify_password');

    passwordInput.value = 'Password';

    triggerEvent(passwordInput);

    verifyPasswordInput.value = 'Passwor';

    triggerEvent(verifyPasswordInput);

    fixture.detectChanges();

    expect(getErrorMessage(matFormField)).toBe('Your passwords do not match');
  });

  it('form should send user data on submit', () => {
    const host: HTMLElement = fixture.nativeElement;
    const data: User = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@test.com',
      password: 'Password',
    };

    usersServiceSpy.addUser.and.returnValue(
      from([{ status: 200, payload: null }])
    );

    fillForm(host, fixture, data);

    component.onSubmit();

    expect(usersServiceSpy.addUser).toHaveBeenCalledWith(data);

    expect(component.loading).toBe(false);

    expect(component.success).toBe(true);
  });

  it('form should show error message if there is a server error', () => {
    const host: HTMLElement = fixture.nativeElement;
    const data: User = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@test.com',
      password: 'Password',
    };

    usersServiceSpy.addUser.and.returnValue(
      from([{ status: 500, error: { msg: 'Something went wrong' } }])
    );

    fillForm(host, fixture, data);

    component.onSubmit();

    expect(component.loading).toBe(false);

    expect(component.success).toBe(false);

    expect(component.error).toBe('Something went wrong');
  });
});
