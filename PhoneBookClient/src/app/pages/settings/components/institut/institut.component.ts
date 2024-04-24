import { Component, HostListener, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TypeInstitut } from 'src/app/pages/contact/models/type.model';
import Swal from 'sweetalert2';
import { InstitutItem, InstitutType, PageType, TypeItem } from '../../models/parametre.model';

@Component({
  selector: 'app-institut',
  templateUrl: './institut.component.html',
  styleUrl: './institut.component.scss'
})
export class InstitutComponent implements OnInit{

  constructor(private settingsService: SettingsService){}

  institutPages!: InstitutType;
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
  selectedType!: TypeItem;
  filteredType!: TypeItem;

  ngOnInit(): void {
    
    this.formatType();
    this.initCreateForm();
  }

  initCreateForm() {
    this.createInstitutForm = new FormGroup({
      id: new FormControl(''),
      nom: new FormControl('', [Validators.required]),
      adresse: new FormControl(''),
      telephone_fixe: new FormControl(''),
      typeInstitutId: new FormControl('', [Validators.required])

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
            this.createInstitutForm.reset();
            this.paginateInstitutions(1, this.filteredType.id);
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
    if (!this.showOptions) {
      return;
    }
    const target = event.target as HTMLElement;
    if (!target.closest('.autocomplete-list')) {
      this.showOptions = false;
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
    if (!this.showOptions) {
      return;
    }
    const target = event.target as HTMLElement;
    if (!target.closest('.autocomplete-list')) {
      this.showOptions = false;
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
    this.createInstitutForm.get('typeInstitutId')?.setValue(data.typeInstitutId);

    let type = this.rechercherTypeParId(data.typeInstitutId);
    this.nomType = type.nom;
  }

}


