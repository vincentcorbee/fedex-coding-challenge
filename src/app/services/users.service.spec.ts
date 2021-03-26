import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { cold } from 'jasmine-marbles';
import { from, throwError } from 'rxjs';

import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const httpClientMock = jasmine.createSpyObj('HttpClient', ['post']);

    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: httpClientMock }],
    });
    service = TestBed.inject(UsersService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('addUser() should return a UsersServiceReponse if request is succesfull', () => {
    const expected = cold('(a|)', {
      a: {
        status: 200,
        payload: '',
      },
    });
    const user = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@user.com',
      password: 'Password',
    };

    httpClientSpy.post.and.returnValue(from(['']));

    const provided = service.addUser(user);

    expect(provided).toBeObservable(expected);
  });

  it('addUser() should return a UsersServiceReponse if request is unsuccessfull', () => {
    const expected = cold('(a|)', {
      a: {
        status: 500,
        error: {
          msg: 'Something went wrong',
        },
      },
    });
    const user = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@user.com',
      password: 'Password',
    };

    httpClientSpy.post.and.returnValue(
      throwError({ status: 500, statusText: 'Something went wrong' })
    );

    const provided = service.addUser(user);

    expect(provided).toBeObservable(expected);
  });
});
