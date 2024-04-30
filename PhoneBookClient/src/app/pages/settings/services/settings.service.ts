import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pays } from '../../contact/models/pays.model';
import { InstitutType, PageType, PaysType, TypeItem, VilleType } from '../models/parametre.model';
import { Ville } from '../../contact/models/ville.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http: HttpClient) { }

  


  PaginateTypeInstitution(page: number): Observable<PageType> {
    return this.http.get<PageType>(
      `${environment.apiUrl}/types?page=${page}`
    );
  }

  PaginateVille(page: number,pays: number): Observable<VilleType> {
    return this.http.get<VilleType>(
      `${environment.apiUrl}/villes?page=${page}&pays=${pays}`
    );
  }

  PaginatePays(page: number): Observable<PaysType> {
    return this.http.get<PaysType>(
      `${environment.apiUrl}/pays?page=${page}`
    );
  }

  PaginateInstitution(page: number,type: number): Observable<InstitutType> {
    return this.http.get<InstitutType>(
      `${environment.apiUrl}/institutions?page=${page}&type=${type}`
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

  saveInstitut(request: any): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/institutions`,request
    );
  }

  saveVille(request: any): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/villes`,request
    );
  }

  savePays(request: any): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/pays`,request
    );
  }

  deletePays(id: any): Observable<any> {
    return this.http.delete<any>(
      `${environment.apiUrl}/pays/${id}`,
    );
  }

  deleteVille(id: any): Observable<any> {
    return this.http.delete<any>(
      `${environment.apiUrl}/villes/${id}`,
    );
  }

  deleteTypes(id: any): Observable<any> {
    return this.http.delete<any>(
      `${environment.apiUrl}/types/${id}`,
    );
  }

  deleteInstitutions(id: any): Observable<any> {
    return this.http.delete<any>(
      `${environment.apiUrl}/institutions/${id}`,
    );
  }

  downloadExcel(): void {
    const filePath = 'assets/file/contacts_import_template.xlsx'; // Chemin vers le fichier Excel dans le répertoire assets
    this.http.get(filePath, { responseType: 'blob' }).subscribe(response => {
      const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(blob);
      downloadLink.download = 'contacts_import_template.xlsx'; // Nom du fichier téléchargé
      downloadLink.click();
    });
  }

}


