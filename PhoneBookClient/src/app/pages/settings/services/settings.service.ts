import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pays } from '../../contact/models/pays.model';
import { PageType, TypeItem } from '../models/page-type.model';
import { Ville } from '../../contact/models/ville.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http: HttpClient) { }

  


  PaginateTypeInstitution(page: number,ville: number): Observable<PageType> {
    return this.http.get<PageType>(
      `${environment.apiUrl}/types?page=${page}&ville=${ville}`
    );
  }

  formaVille(): Observable<Ville[]> {
    return this.http.get<Ville[]>(
      `${environment.apiUrl}/settings/format-ville`
    );
  }

  formatType(): Observable<TypeItem[]> {
    return this.http.get<TypeItem[]>(
      `${environment.apiUrl}/settings/format-type`
    );
  }

  saveTypeInstitut(request: any): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/types`,request
    );
  }


}


