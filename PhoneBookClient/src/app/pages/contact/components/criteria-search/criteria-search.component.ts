import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Contact } from '../../models/contact.model';
import { Institut } from '../../models/institut.model';
import { ContactPagination } from '../../models/page-contact.model';
import { Pays } from '../../models/pays.model';
import { TypeInstitut } from '../../models/type.model';
import { Ville } from '../../models/ville.model';
import { ContactService } from '../../services/contact.service';
import { ModalService } from '../../services/modal.service';
import { TreeData } from '../tree-node/tree-data.model';
import { TreeItem } from '../tree-node/tree.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-criteria-search',
  templateUrl: './criteria-search.component.html',
  styleUrl: './criteria-search.component.scss'
})
export class CriteriaSearchComponent  implements OnInit, OnDestroy {

  // filter institut
  myControl = new FormControl();

  instituts: Institut[] = []; // Assurez-vous d'avoir la bonne interface Cabinet



  // Filtrer les cabinets en fonction de la saisie de l'utilisateur
  filteredInstituts: Institut[] = [];
  showOptions: boolean = false;
  selectedInstitut!: Institut;
  filteredInstitut: Institut | undefined;

  // list visibility
  paysSelected = false;
  villeSelected = false;
  typeSelected = false;
  institutionSelected = false;

  // Selected Elements

  selectedIdPays = 0;
  selectedIdVille = 0;
  selectedIdType = 0;

  // Recherche

  currentPage: number = 1;
  pays: Pays[] = [];

  contacts: Contact[] = [];
  contactPages!: ContactPagination;

  villes: Ville[] = [];

  types: TypeInstitut[] = [];

  nomInstitut: string = '';

  submitSearch = false;

  constructor(private contactService: ContactService, private router: Router,private modalService: ModalService){

  }
  
  ngOnInit(): void {
    this.initSearchForm();
    this.listPays();
    this.favorisContact(this.currentPage);

  }
  term: any;
  paginationDatas: any;

  page: any = 1;
  pageSize: any = 3;
  startIndex: number = 0;
  endIndex: number = 3;
  totalRecords: number = 0;
  searchContactForm!: FormGroup;



  modalOuvert = false;

  initSearchForm() {
    this.searchContactForm = new FormGroup({
      institut: new FormControl(''),
      institution: new FormControl(''),
      pays: new FormControl(''),
      type: new FormControl(''),
      ville: new FormControl(''),
      nom: new FormControl(''),
      prenom: new FormControl(''),
      fonction: new FormControl(''),
    });
  }

  ouvrirModal(data: any, width: any, height: any): void {
    this.modalService.openModal(data, width, height);
  }

  fermerModal(): void {
    this.modalOuvert = false;
  }

  navigateToCreate(){
    this.router.navigate(['/contact/creer']);
  }

  navigateToEdit(id:any){
    const hashId = btoa(id);
    this.router.navigate(['/contact/edit/'+hashId]);
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

  selectOption(cab: Institut) {
    this.submitSearch = true;
    this.currentPage = 1;
    // Vous pouvez faire ce que vous voulez avec l'option sélectionnée ici
    this.selectedInstitut = cab;
    this.institutionSelected = true;
    if (this.searchContactForm) {
      const institutControl = this.searchContactForm.get('institut');
      const institutionControl = this.searchContactForm.get('institution');
      if (institutControl) {
        // Maintenant, vous pouvez utiliser institutControl en toute sécurité
        // Par exemple, obtenir la valeur de contrôle
        institutionControl?.setValue(cab.id);
        institutControl.setValue(cab.nom);
        this.filteredInstitut = cab;
        this.searchContact(this.searchContactForm.value, this.currentPage);
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

  // BEGIN TREE


  searchContact(request: any, page: any){
    this.contactService.criteriaSearchContacts(request, page).subscribe((res) => {
      this.contactPages = res;
      this.contacts = this.contactPages.data;
    });
  }

  favorisContact(page: any){
    this.contactService.favorisContacts(page).subscribe((res) => {
      this.contactPages = res;
      this.contacts = this.contactPages.data;
    });
  }

  // END TREE

  listPays(){
    this.contactService.getListCountries().subscribe((res) => {
      this.pays = res;
    });
  }

  listVillesParPays(id: number){
    this.selectedIdPays = id;
    this.contactService.getCityByCountrie(id).subscribe((res) => {
      this.villes = res;
    });
  }

  listTypesParVille(id: number){
    this.selectedIdVille = id;
    this.contactService.getTypeByCity(id).subscribe((res) => {
      this.types = res;
    });
  }

  listInstitutParType(id: number){
    this.selectedIdType = id;
    this.contactService.getInstitutByType(id).subscribe((res) => {
      this.instituts = res;
    });
  }


  onCountrieSelectChange(event: any){
    this.submitSearch = true;
    this.currentPage = 1;
    this.searchContactForm.get('institut')?.setValue('');
    this.contacts = [];
    if(event.target.value !== ''){
      
      this.listVillesParPays(event.target.value);
      this.searchContact(this.searchContactForm.value, this.currentPage); 
      this.paysSelected = true;
      this.villeSelected = false;
      this.typeSelected = false;
      this.institutionSelected = false;
      this.instituts = [];
      this.filteredInstitut = undefined;
    }else{
      this.paysSelected = false;
      this.villeSelected = false;
      this.typeSelected = false;
      this.institutionSelected = false;
      this.instituts = [];
      this.filteredInstitut = undefined;

    }
  }

  onVilleSelectChange(event: any){
    this.submitSearch = true;
    this.currentPage = 1;
    this.searchContactForm.get('institut')?.setValue('');
    if(event.target.value !== ''){
    this.listTypesParVille(event.target.value);
    this.searchContact(this.searchContactForm.value, this.currentPage);
    this.villeSelected = true;
    this.typeSelected = false;
    this.institutionSelected = false;
    this.instituts = [];

    this.filteredInstitut = undefined;

    // nettoyer les tree

    }else{
      this.villeSelected = false;
      this.typeSelected = false;

      this.filteredInstitut = undefined;
      // nettoyer les tree
      this.filteredInstitut = undefined;
      this.listVillesParPays(this.selectedIdPays);
      this.institutionSelected = false;
      this.instituts = []; 
      
    } 
  }

  onTypeSelectChange(event: any){
    this.submitSearch = true;
    this.currentPage = 1;
    this.searchContactForm.get('institut')?.setValue('');
    this.instituts = [];
    this.filteredInstituts = [];

    if(event.target.value !== ''){
      this.listInstitutParType(event.target.value);
      this.searchContact(this.searchContactForm.value, this.currentPage);
      this.typeSelected = true;
      this.institutionSelected = false;

      this.filteredInstitut = undefined;
    }else{
      this.typeSelected = false;
      this.listTypesParVille(this.selectedIdVille);
      this.institutionSelected = false;
      this.filteredInstitut = undefined;
    }
  }

  paginateContact(page: any){
    this.currentPage = page;
    if(this.submitSearch){
      this.searchContact(this.searchContactForm.value, this.currentPage)
    }else{
      this.favorisContact(this.currentPage);
    }
  }

  ngOnDestroy(): void {
    this.contactService.setSharedData(null);
  }


  filter(){
    this.submitSearch = true;
    this.currentPage = 1;
    this.searchContact(this.searchContactForm.value, this.currentPage);
  }

  resetSearch(){
    this.searchContactForm.reset();
    this.paysSelected = false;
    this.villeSelected = false;
    this.typeSelected = false;
    this.institutionSelected = false;
    this.instituts = [];
    this.filteredInstitut = undefined;
    if(this.contactPages.links){
      this.contactPages.links = [];
    }
    this.filteredInstitut = undefined;
    this.contacts = [];
    this.contactPages ??  undefined
    this.currentPage = 1;
    this.submitSearch = false;
    this.favorisContact(this.currentPage);

  }

  onClickOnFavoris(id:number){
    this.contactService.favoris(id).subscribe((res) => {
      Swal.fire({
        title: "Enregistré!",
        text: res.message,
        icon: "success"
      });

      if(this.submitSearch){
        this.searchContact(this.searchContactForm.value, this.currentPage)
      }else{
        this.favorisContact(this.currentPage);
      }
    });
  }



}

