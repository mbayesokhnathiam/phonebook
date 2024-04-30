import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Ville } from 'src/app/pages/contact/models/ville.model';
import Swal from 'sweetalert2';
import { PageType, TypeItem, VilleItem, VilleType } from '../../models/parametre.model';
import { SettingsService } from '../../services/settings.service';
import { ContactService } from 'src/app/pages/contact/services/contact.service';
import { Pays } from 'src/app/pages/contact/models/pays.model';

@Component({
  selector: 'app-ville',
  templateUrl: './ville.component.html',
  styleUrl: './ville.component.scss'
})
export class VilleComponent  implements OnInit{

  constructor(private settingsService: SettingsService, private contactService: ContactService){}

  villePages!: VilleType;
  selectedPaysId: number = 0;
  selectedPays!: any;
  villes: VilleItem[] = [];

  createVilleForm!: FormGroup;


  pays: Pays[] = [];

  currentPage = 1;


  ngOnInit(): void {
    this.listPays();
    this.initCreateForm();
  }

  listPays(){
    this.contactService.getListCountries().subscribe((res) => {
      this.pays = res;
    });
  }
  initCreateForm() {
    this.createVilleForm = new FormGroup({
      id: new FormControl(''),
      nom: new FormControl('', [Validators.required]),
      paysId: new FormControl('', [Validators.required])

    });
  }

  afficherVille(pays: any){
    this.selectedPaysId = pays.value;
      if(this.selectedPaysId !== 0){
        this.paginateVilles(1,this.selectedPaysId);
      }
  }

  creerTypeInstitution(){
    Swal.fire({
      title: "Confirmation",
      text: "Voulez-vous enregistrer cette ville?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#008000",
      cancelButtonColor: "#d33",
      cancelButtonText: "NON",
      confirmButtonText: "OUI"
    }).then((result) => {
      if (result.isConfirmed) {
        this.settingsService.saveVille(this.createVilleForm.value).subscribe((res) => {
 
          if(res.status === 201){
            Swal.fire({
              title: "Enregistré!",
              text: res.message,
              icon: "success"
            });
           
            if(this.selectedPaysId !== 0){
              this.paginateVilles(this.currentPage,this.selectedPaysId);
            }else{
              this.paginateVilles(this.currentPage,this.createVilleForm.get('paysId')?.value);
            }
            this.createVilleForm.reset();
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

  paginateVilles(page: any, pays:any){
    this.currentPage = page;
    this.settingsService.PaginateVille(page,pays).subscribe((res) => {
      this.villePages = res;
      this.villes = this.villePages.data;
    });
  }

  edit(data: any){
    this.createVilleForm.get('id')?.setValue(data.id);
    this.createVilleForm.get('nom')?.setValue(data.nom);
    this.createVilleForm.get('paysId')?.setValue(data.paysId);
  }

  delete(data:any){
    Swal.fire({
      title: "Confirmation",
      text: "Voulez-vous supprimer cette ville?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#008000",
      cancelButtonColor: "#d33",
      cancelButtonText: "NON",
      confirmButtonText: "OUI"
    }).then((result) => {
      if (result.isConfirmed) {
        this.settingsService.deleteVille(data.id).subscribe((res) => {

          if(res.status === 200){
            Swal.fire({
              title: "Suppression",
              text: res.message,
              icon: "success"
            });
            this.paginateVilles(this.currentPage,this.selectedPaysId);
          }else if(res.status === 400){
            Swal.fire({
              title: "Suppression",
              text: res.message,
              icon: "warning"
            });
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

}


