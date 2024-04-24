import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Institut } from '../../models/institut.model';
import { Router } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import Swal from 'sweetalert2'
import { Pays } from '../../models/pays.model';
import { TypeInstitut } from '../../models/type.model';
import { Ville } from '../../models/ville.model';

@Component({
  selector: 'app-creer-contact',
  templateUrl: './creer-contact.component.html',
  styleUrl: './creer-contact.component.scss'
})
export class CreerContactComponent implements OnInit {

  pays: Pays[] = [];



  villes: Ville[] = [];

  types: TypeInstitut[] = [];

  
  createContactForm!: FormGroup;
  nomInstitut: string = '';
  // filter institut
  myControl = new FormControl();

  instituts: Institut[] = []; // Assurez-vous d'avoir la bonne interface Cabinet


  // Filtrer les cabinets en fonction de la saisie de l'utilisateur
  filteredInstituts: Institut[] = [];
  showOptions: boolean = false;
  selectedInstitut!: Institut;
  filteredInstitut!: Institut;


  initCreateForm() {
    this.createContactForm = new FormGroup({
      prenom: new FormControl('', [Validators.required]),
      nom: new FormControl('', [Validators.required]),
      fonction: new FormControl('', [Validators.required]),
      telephone_fixe: new FormControl(''),
      telephone_mobile: new FormControl(''),
      telephone_domicile: new FormControl(''),
      email: new FormControl(''),
      commentaire: new FormControl(''),
      institutId: new FormControl(''),
      pays: new FormControl(''),
      ville: new FormControl(''),
      type: new FormControl(''),
    });
  }

  constructor(private contactService: ContactService, private router: Router) { }
  ngOnInit(): void {
    this.initCreateForm();
    this.listPays();
  }


  onInputChange(target: any) {

    this.filteredInstituts = this.instituts.filter(i =>
      i.nom.toLowerCase().includes(target.value.toLowerCase())
    );
    this.showOptions = true;
  }

  toggleOptions(event: MouseEvent) {
    this.showOptions = !this.showOptions;
    event.stopPropagation(); // Empêche la propagation de l'événement de clic pour éviter la fermeture immédiate
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent) {
    if (!this.showOptions) {
      return;
    }
    const target = event.target as HTMLElement;
    if (!target.closest('.autocomplete-list')) {
      this.showOptions = false;
    }
  }

  selectOption(cab: Institut) {
    // Vous pouvez faire ce que vous voulez avec l'option sélectionnée ici
    this.selectedInstitut = cab;
    if (this.createContactForm) {
      const institutControl = this.createContactForm.get('institutId');
      if (institutControl) {
        // Maintenant, vous pouvez utiliser institutControl en toute sécurité
        // Par exemple, obtenir la valeur de contrôle
        institutControl.setValue(cab.id);
        this.nomInstitut = cab.nom;
        this.filteredInstitut = cab;
        this.showOptions = false;
      } else {
        console.error('Le contrôle "institut" n\'a pas été trouvé dans le formulaire.');
      }
    } else {
      console.error('Le formulaire "searchContactForm" est nul.');
    }
   
    if (!this.showOptions) {
      return;
    }

    if(event){
      const target = event.target as HTMLElement;
      if (!target.closest('.autocomplete-list')) {
        this.showOptions = false;
      }
    }
    
  }

  listPays(){
    this.contactService.getListCountries().subscribe((res) => {
      this.pays = res;
    });
  }

  listVillesParPays(id: number){
    this.contactService.getCityByCountrie(id).subscribe((res) => {
      this.villes = res;
    });
  }

  listTypesParVille(id: number){
    this.contactService.getTypeByCity(id).subscribe((res) => {
      this.types = res;
    });
  }

  listInstitutParType(id: number){
    this.contactService.getInstitutByType(id).subscribe((res) => {
      this.instituts = res;
    });
  }


  onCountrieSelectChange(event: any){
    this.listVillesParPays(event.target.value); 
  }

  onVilleSelectChange(event: any){
    this.listTypesParVille(event.target.value) 
  }

  onTypeSelectChange(event: any){
    this.listInstitutParType(event.target.value) 
  }

  saveContact(){

    Swal.fire({
      title: "Confirmation",
      text: "Voulez-vous enregistrer ce contact?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#008000",
      cancelButtonColor: "#d33",
      cancelButtonText: "NON",
      confirmButtonText: "OUI"
    }).then((result) => {
      if (result.isConfirmed) {
        this.contactService.createContact(this.createContactForm.value).subscribe((res) => {
 
          if(res.status === 201){
            Swal.fire({
              title: "Enregistré!",
              text: res.message,
              icon: "success"
            });
            this.nomInstitut = '';
            this.createContactForm.reset();
      
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
