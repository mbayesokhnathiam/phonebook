import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserPagination } from '../models/page-user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  paginateUsers(page:any): Observable<UserPagination> {
    return this.http.get<UserPagination>(
      `${environment.apiUrl}/users?page=${page}`
    );
  }

  createUser(request:any): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/users`,request
    );
  }

  resetPasswordUser(id:any): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl}/auth/reset/users?id=${id}`
    );
  }
}
