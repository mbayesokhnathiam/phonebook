import { Component, HostListener, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { PageType, TypeItem } from '../../models/parametre.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Institut } from 'src/app/pages/contact/models/institut.model';
import { Ville } from 'src/app/pages/contact/models/ville.model';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-type-institut',
  templateUrl: './type-institut.component.html',
  styleUrl: './type-institut.component.scss'
})
export class TypeInstitutComponent implements OnInit{

  constructor(private settingsService: SettingsService){}

  typePages!: PageType;
  selectedVilleId!: number;
  selectedType!: any;
  types: TypeItem[] = [];

  createTypeForm!: FormGroup;
  nomVille: string = '';
  nomVilleSearch: string = '';
  // filter institut
  myControl = new FormControl();

  villes: Ville[] = []; // Assurez-vous d'avoir la bonne interface Cabinet


  // Filtrer les cabinets en fonction de la saisie de l'utilisateur
  filteredVilles: Ville[] = [];
  filteredVillesSearch: Ville[] = [];
  showOptions: boolean = false;
  showOptionsSearch: boolean = false;
  selectedVille!: Ville;
  filteredVille!: Ville;

  ngOnInit(): void {
    
    this.formatVille();
    this.initCreateForm();
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
      title: "Confirmation",
      text: "Voulez-vous enregistrer ce type d'institution?",
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
            this.nomVille = '';
            this.createTypeForm.reset();
            this.paginateTypes(1,this.filteredVille.id);
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

  formatVille(){
    this.settingsService.formaVille().subscribe((res) => {
      this.villes = res;
    });
  }

  onInputChange(target: any) {
    this.filteredVilles = this.villes.filter(i =>
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

  selectOption(cab: Ville) {
    // Vous pouvez faire ce que vous voulez avec l'option sélectionnée ici
    this.selectedVille = cab;
    if (this.createTypeForm) {
      const institutControl = this.createTypeForm.get('villeId');
      if (institutControl) {
        // Maintenant, vous pouvez utiliser institutControl en toute sécurité
        // Par exemple, obtenir la valeur de contrôle
        institutControl.setValue(cab.id);
        this.nomVille = cab.nom;
        this.filteredVille = cab;
        this.showOptions = false;
      } else {
        console.error('Le contrôle "ville" n\'a pas été trouvé dans le formulaire.');
      }
    } else {
      console.error('Le formulaire "createTypeForm" est nul.');
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
    this.filteredVillesSearch = this.villes.filter(i =>
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

  selectOptionSearch(cab: Ville) {
    // Vous pouvez faire ce que vous voulez avec l'option sélectionnée ici
    this.selectedVille = cab;
    
    this.paginateTypes(1, cab.id);
   
    this.showOptionsSearch = !this.showOptionsSearch;
    this.nomVilleSearch = cab.nom

    if(event){
      const target = event.target as HTMLElement;
      if (!target.closest('.autocomplete-list')) {
        this.showOptionsSearch = false;
      }
    }
    
  }

  // End search

  rechercherVilleParId(id: number): Ville {
    return this.villes.filter(ville => ville.id === id)[0]; // Utilisez filter pour rechercher la ville par son ID
  }
  edit(data: any){
    this.createTypeForm.get('id')?.setValue(data.id);
    this.createTypeForm.get('nom')?.setValue(data.nom);
    this.createTypeForm.get('villeId')?.setValue(data.villeId);

    let ville = this.rechercherVilleParId(data.villeId);
    this.nomVille = ville.nom;
  }

}


