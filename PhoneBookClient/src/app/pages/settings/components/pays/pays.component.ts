import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { ContactService } from 'src/app/pages/contact/services/contact.service';
import { PaysItem, PaysType } from '../../models/parametre.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pays',
  templateUrl: './pays.component.html',
  styleUrl: './pays.component.scss'
})
export class PaysComponent  implements OnInit{

  constructor(private settingsService: SettingsService, private contactService: ContactService){}

  paysPages!: PaysType;

  pays: PaysItem[] = [];

  createPaysForm!: FormGroup;

  currentPage = 1;



  ngOnInit(): void {
    this.initCreateForm();
    this.paginatePays(1);
  }

  initCreateForm() {
    this.createPaysForm = new FormGroup({
      id: new FormControl(''),
      code: new FormControl('', [Validators.required]),
      nom_fr_fr: new FormControl('', [Validators.required]),
    });
  }



  creerTypeInstitution(){
    Swal.fire({
      title: "Confirmation",
      text: "Voulez-vous enregistrer ce pays?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#008000",
      cancelButtonColor: "#d33",
      cancelButtonText: "NON",
      confirmButtonText: "OUI"
    }).then((result) => {
      if (result.isConfirmed) {
        this.settingsService.savePays(this.createPaysForm.value).subscribe((res) => {
 
          if(res.status === 201){
            Swal.fire({
              title: "Enregistré!",
              text: res.message,
              icon: "success"
            });
            this.createPaysForm.reset();
            this.paginatePays(this.currentPage);
          }else{
            Swal.fire({
              title: "Erreur!",
              text: res.message,
              icon: "error"
            });
          }
        });
        
      }
    })
    
  }

  paginatePays(page: any){
    this.currentPage = page;
    this.settingsService.PaginatePays(page).subscribe((res) => {
      this.paysPages = res;
      this.pays = this.paysPages.data;
    });
  }

  edit(data: any){
    this.createPaysForm.get('id')?.setValue(data.id);
    this.createPaysForm.get('nom_fr_fr')?.setValue(data.nom_fr_fr);
    this.createPaysForm.get('code')?.setValue(data.code);
  }

  delete(data:any){
    Swal.fire({
      title: "Confirmation",
      text: "Voulez-vous supprimer ce pays?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#008000",
      cancelButtonColor: "#d33",
      cancelButtonText: "NON",
      confirmButtonText: "OUI"
    }).then((result) => {
      if (result.isConfirmed) {
        this.settingsService.deletePays(data.id).subscribe((res) => {
 
          if(res.status === 200){
            Swal.fire({
              title: "Suppression",
              text: res.message,
              icon: "success"
            });
            this.createPaysForm.reset();
            this.paginatePays(this.currentPage);
          }else if(res.status === 400){
            Swal.fire({
              title: "Suppression",
              text: res.message,
              icon: "warning"
            });
          }else{
            Swal.fire({
              title: "Suppression",
              text: res.message,
              icon: "error"
            });
          }
        });
        
      }
    })
    
  }

  

}


