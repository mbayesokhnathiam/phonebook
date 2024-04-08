import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetailComponent } from '../components/detail/detail.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(public dialog: MatDialog) { }

  openModal(data: any, width: string = 'auto', height: string = 'auto'): void {
    this.dialog.open(DetailComponent, {
      width: width,
      height: height,
      data: data
    });
  }
}
