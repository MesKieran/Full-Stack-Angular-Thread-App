import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environment';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http = inject(HttpClient);
  localStorageKey =  'thread_user';
  createUser(name:string) {
    return this.http.post<User>(`${environment.apiBaseUrl}/users`, {name,});
  }
  saveUserToLocalStorage(user:User) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(user));
  }
  getUserFromLocalStorage() {
    const user = localStorage.getItem(this.localStorageKey);
    return user ? JSON.parse(user) : null;
  }
}
