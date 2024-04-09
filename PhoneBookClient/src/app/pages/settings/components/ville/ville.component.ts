import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Ville } from 'src/app/pages/contact/models/ville.model';
import Swal from 'sweetalert2';
import { PageType, TypeItem } from '../../models/page-type.model';
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

  typePages!: PageType;
  selectedVilleId!: number;
  selectedType!: any;
  types: TypeItem[] = [];

  createTypeForm!: FormGroup;


  pays: Pays[] = [];

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
    this.createTypeForm = new FormGroup({
      id: new FormControl(''),
      nom: new FormControl('', [Validators.required]),
      villeId: new FormControl('', [Validators.required])

    });
  }

  creerTypeInstitution(){
    Swal.fire({
      title: "Confirmation?",
      text: "Voulez-vous enregistrer ce type d'institution!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#008000",
      cancelButtonColor: "#d33",
      cancelButtonText: "NON",
      confirmButtonText: "OUI"
    }).then((result) => {
      if (result.isConfirmed) {
        this.settingsService.saveTypeInstitut(this.createTypeForm.value).subscribe((res) => {
 
          if(res.status === 201){
            Swal.fire({
              title: "Enregistré!",
              text: res.message,
              icon: "success"
            });
            this.createTypeForm.reset();
            this.paginateTypes(1,1);
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

  paginateTypes(page: any, ville:any){
    this.settingsService.PaginateTypeInstitution(page,ville).subscribe((res) => {
      this.typePages = res;
      this.types = this.typePages.data;
    });
  }

  

}


