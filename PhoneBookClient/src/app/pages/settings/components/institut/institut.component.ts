import { Component, HostListener, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TypeInstitut } from 'src/app/pages/contact/models/type.model';
import Swal from 'sweetalert2';
import { InstitutItem, InstitutType, PageType, TypeItem } from '../../models/parametre.model';
import { ContactService } from 'src/app/pages/contact/services/contact.service';
import { Pays } from 'src/app/pages/contact/models/pays.model';
import { Ville } from 'src/app/pages/contact/models/ville.model';

@Component({
  selector: 'app-institut',
  templateUrl: './institut.component.html',
  styleUrl: './institut.component.scss'
})
export class InstitutComponent implements OnInit{

  constructor(private settingsService: SettingsService, private contactService: ContactService){}

  institutPages!: InstitutType | undefined;
  selectedTypeId!: number;

  instititutions: InstitutItem[] = [];

  createInstitutForm!: FormGroup;
  nomType: string = '';
  nomTypeSearch: string = '';
  // filter institut
  myControl = new FormControl();

  types: TypeItem[] = []; // Assurez-vous d'avoir la bonne interface Cabinet


  // Filtrer les cabinets en fonction de la saisie de l'utilisateur
  filteredTypes: TypeItem[] = [];
  filteredTypesSearch: TypeItem[] = [];
  showOptions: boolean = false;
  showOptionsSearch: boolean = false;
  selectedType!: TypeItem | null;
  filteredType!: TypeItem;

  pays: Pays[] = [];

  villes: Ville[] = [];

  currentPage = 1;

  ngOnInit(): void {
    
    this.formatType();
    this.initCreateForm();
    this.listPays();
  }

  initCreateForm() {
    this.createInstitutForm = new FormGroup({
      id: new FormControl(''),
      nom: new FormControl('', [Validators.required]),
      adresse: new FormControl(''),
      telephone_fixe: new FormControl(''),
      typeInstitutId: new FormControl('', [Validators.required]),
      paysId: new FormControl('', [Validators.required]),
      villeId: new FormControl('', [Validators.required])

    });
  }

  listPays(){
    this.contactService.getListCountries().subscribe((res) => {
      this.pays = res;
    });
  }

  creerInstitution(){
    Swal.fire({
      title: "Confirmation",
      text: "Voulez-vous enregistrer cette institution?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#008000",
      cancelButtonColor: "#d33",
      cancelButtonText: "NON",
      confirmButtonText: "OUI"
    }).then((result) => {
      if (result.isConfirmed) {
        this.settingsService.saveInstitut(this.createInstitutForm.value).subscribe((res) => {
 
          if(res.status === 201){
            Swal.fire({
              title: "Enregistré!",
              text: res.message,
              icon: "success"
            });
            this.nomType = '';

            if(this.selectedType){
              this.paginateInstitutions(this.currentPage, this.selectedType.id);
            }else{
              this.paginateInstitutions(this.currentPage, this.createInstitutForm.get('typeInstitutId')?.value);
            }
            
            
            this.villes = [];
            this.createInstitutForm.get('paysId')?.setValue('');
            this.createInstitutForm.reset();
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

  paginateInstitutions(page: any, ville:any){
    this.currentPage = page;
    this.settingsService.PaginateInstitution(page,ville).subscribe((res) => {
      this.institutPages = res;
      this.instititutions = this.institutPages.data;
    });
  }

  formatType(){
    this.settingsService.formatType().subscribe((res) => {
      this.types = res;
    });
  }

  onCountrieSelectChange(event: any){

    if(event.target.value !== ''){
      this.listVillesParPays(event.target.value); 
      
    }
  }

  listVillesParPays(id: number){

    this.contactService.getCityByCountrie(id).subscribe((res) => {
      this.villes = res;
    });
  }
  onInputChange(target: any) {
    this.filteredTypes = this.types.filter(i =>
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
    // if (!this.showOptions && !this.showOptionsSearch) {
    //   return;
    // }
    const target = event.target as HTMLElement;
    if (!target.closest('.autocomplete-list')) {
      this.showOptions = false;
      this.showOptionsSearch = false;
    }
    
  }

  selectOption(cab: TypeItem) {
    // Vous pouvez faire ce que vous voulez avec l'option sélectionnée ici
    this.selectedType = cab;
    if (this.createInstitutForm) {
      const typeControl = this.createInstitutForm.get('typeInstitutId');
      if (typeControl) {
        // Maintenant, vous pouvez utiliser institutControl en toute sécurité
        // Par exemple, obtenir la valeur de contrôle
        typeControl.setValue(cab.id);
        this.nomType = cab.nom;
        this.filteredType = cab;
        this.showOptions = false;
      } else {
        console.error('Le contrôle "type" n\'a pas été trouvé dans le formulaire.');
      }
    } else {
      console.error('Le formulaire "createInstitutionForm" est nul.');
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

  // search

  onInputChangeSearch(target: any) {
    this.filteredTypesSearch = this.types.filter(i =>
      i.nom.toLowerCase().includes(target.value.toLowerCase())
    );
    this.showOptionsSearch = true;
  }

  toggleOptionsSearch(event: MouseEvent) {
    this.showOptions = !this.showOptions;
    event.stopPropagation(); // Empêche la propagation de l'événement de clic pour éviter la fermeture immédiate
  }

  @HostListener('document:click', ['$event'])
  clickOutsideSearch(event: MouseEvent) {
    // if (!this.showOptions) {
    //   return;
    // }
    const target = event.target as HTMLElement;
    if (!target.closest('.autocomplete-list')) {
      this.showOptions = false;
      this.showOptionsSearch = false;
    }
  }

  selectOptionSearch(cab:TypeItem) {
    // Vous pouvez faire ce que vous voulez avec l'option sélectionnée ici
    this.selectedType = cab;
    
    this.paginateInstitutions(1, cab.id);
   
    this.showOptionsSearch = !this.showOptionsSearch;
    this.nomTypeSearch = cab.nom

    if(event){
      const target = event.target as HTMLElement;
      if (!target.closest('.autocomplete-list')) {
        this.showOptionsSearch = false;
      }
    }
    
  }

  // End search

  rechercherTypeParId(id: number): TypeItem {
    return this.types.filter(type => type.id === id)[0]; // Utilisez filter pour rechercher la ville par son ID
  }
  edit(data: any){
    this.createInstitutForm.get('id')?.setValue(data.id);
    this.createInstitutForm.get('nom')?.setValue(data.nom);
    this.createInstitutForm.get('adresse')?.setValue(data.adresse);
    this.createInstitutForm.get('telephone_fixe')?.setValue(data.telephone_fixe);
    this.createInstitutForm.get('paysId')?.setValue(data.paysId);
    this.listVillesParPays(data.paysId);
    this.createInstitutForm.get('villeId')?.setValue(data.villeId);
    this.createInstitutForm.get('typeInstitutId')?.setValue(data.typeInstitutId);

    let type = this.rechercherTypeParId(data.typeInstitutId);
    this.nomType = type.nom;
  }

  delete(data:any){
    Swal.fire({
      title: "Confirmation",
      text: "Voulez-vous supprimer cette institution?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#008000",
      cancelButtonColor: "#d33",
      cancelButtonText: "NON",
      confirmButtonText: "OUI"
    }).then((result) => {
      if (result.isConfirmed) {
        this.settingsService.deleteInstitutions(data.id).subscribe((res) => {
 
          if(res.status === 200){
            Swal.fire({
              title: "Suppression",
              text: res.message,
              icon: "success"
            });
            this.paginateInstitutions(this.currentPage, this.selectedType?.id);
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

  handleClear() {
    // Mettez ici votre logique pour gérer l'effacement du champ de recherche
    this.institutPages = undefined;
    this.filteredTypesSearch = [];
    this.showOptionsSearch = false;
  }

  handleClearForm() {
    // Mettez ici votre logique pour gérer l'effacement du champ de recherche
    this.filteredTypes = [];
    this.showOptions = false;
    this.selectedType = null;
  }

}


