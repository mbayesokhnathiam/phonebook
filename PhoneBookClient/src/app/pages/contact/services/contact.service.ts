import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pays } from '../models/pays.model';
import { Ville } from '../models/ville.model';
import { TypeInstitut } from '../models/type.model';
import { Institut } from '../models/institut.model';
import { TreeData } from '../components/tree-node/tree-data.model';
import { Contact } from '../models/contact.model';
import { ContactPagination } from '../models/page-contact.model';
import { FormatItem } from '../models/format.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private sharedDataSubject = new BehaviorSubject<any>(null);
  sharedData$ = this.sharedDataSubject.asObservable();

  constructor(private http: HttpClient) { }

  setSharedData(data: any): void {
    this.sharedDataSubject.next(data);
  }


  getListCountries(): Observable<Pays[]> {
    return this.http.get<Pays[]>(
      `${environment.apiUrl}/data/pays`
    );
  }

  getCityByCountrie(pays: number): Observable<Ville[]> {
    return this.http.get<Ville[]>(
      `${environment.apiUrl}/data/villes?pays=${pays}`
    );
  }

  getTypeByCity(ville: number): Observable<TypeInstitut[]> {
    return this.http.get<TypeInstitut[]>(
      `${environment.apiUrl}/data/typeinstituts?ville=${ville}`
    );
  }

  getInstitutByType(type: number): Observable<Institut[]> {
    return this.http.get<Institut[]>(
      `${environment.apiUrl}/data/instituts?type=${type}`
    );
  }

  getAllInstituts(): Observable<Institut[]> {
    return this.http.get<Institut[]>(
      `${environment.apiUrl}/data/instituts`
    );
  }

  searchContacts(request: any): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl}/contacts`,request
    );
  }

  // BEGIN TREE
  filterTreeByCountrie(countrie: any): Observable<TreeData> {
    return this.http.get<TreeData>(
      `${environment.apiUrl}/contacts?pays=${countrie}`
    );
  }

  filterTreeByCity(city: any): Observable<TreeData> {
    return this.http.get<TreeData>(
      `${environment.apiUrl}/contacts?ville=${city}`
    );
  }

  filterTreeByType(type: any): Observable<TreeData> {
    return this.http.get<TreeData>(
      `${environment.apiUrl}/contacts?type=${type}`
    );
  }

  getContactByInstitut(institut: any, page:any): Observable<ContactPagination> {
    return this.http.get<ContactPagination>(
      `${environment.apiUrl}/contacts?institut=${institut}&page=${page}`
    );
  }

  createContact(request: any): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/contacts`,request
    );
  }

  importContact(request: any): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/settings/import-contact`,request
    );
  }
  // END TREE

  getContactByid(id: number): Observable<Contact> {
    return this.http.get<Contact>(
      `${environment.apiUrl}/contacts/${id}`
    );
  }

  formatContact(): Observable<FormatItem[]> {
    return this.http.get<FormatItem[]>(
      `${environment.apiUrl}/format/contacts`
    );
  }
}
