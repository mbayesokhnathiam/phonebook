import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  private sharedDataSubject = new BehaviorSubject<boolean>(false);
  sharedData$ = this.sharedDataSubject.asObservable();

  constructor(private http: HttpClient) { }

  setSharedData(data: any): void {
    this.sharedDataSubject.next(data);
  }
}
