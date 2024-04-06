import { Component, OnInit } from '@angular/core';
import { TreeNodeComponent } from "../tree-node/tree-node.component";
import { paginationlist } from 'src/app/core/data/tablelistjs';
import { ContactService } from '../../services/contact.service';
import { Pays } from '../../models/pays.model';
import { Ville } from '../../models/ville.model';
import { TypeInstitut } from '../../models/type.model';
import { Institut } from '../../models/institut.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TreeItem } from '../tree-node/tree.model';
import { TreeData } from '../tree-node/tree-data.model';
import { Contact } from '../../models/contact.model';
import { ContactPagination } from '../../models/page-contact.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {

  receivedData!: number;
  currentPage: number = 1;
  pays: Pays[] = [];

  contacts: Contact[] = [];
  contactPages!: ContactPagination;

  villes: Ville[] = [];

  types: TypeInstitut[] = [];

  nomInstitut: string = '';

  // filter institut
  myControl = new FormControl();

  instituts: Institut[] = []; // Assurez-vous d'avoir la bonne interface Cabinet

  tree: TreeItem[] = [];
  

  // Filtrer les cabinets en fonction de la saisie de l'utilisateur
  filteredInstituts: Institut[] = [];
  showOptions: boolean = false;
  selectedInstitut!: Institut;
  filteredInstitut!: Institut;

  constructor(private contactService: ContactService, private router: Router){

  }
  ngOnInit(): void {
    this.initSearchForm();
    this.paginationDatas = paginationlist
    this.totalRecords = this.paginationDatas.length

    this.startIndex = (this.page - 1) * this.pageSize + 1;
    this.endIndex = (this.page - 1) * this.pageSize + this.pageSize;
    if (this.endIndex > this.totalRecords) {
      this.endIndex = this.totalRecords;
    }
    this.paginationDatas = paginationlist.slice(this.startIndex - 1, this.endIndex);

    this.listPays();

    this.contactService.sharedData$.subscribe(data => {
      this.receivedData = data;
      this.getContactByInstitut(this.receivedData,this.currentPage);
    });
  }
  term: any;
  paginationDatas: any;

  page: any = 1;
  pageSize: any = 3;
  startIndex: number = 0;
  endIndex: number = 3;
  totalRecords: number = 0;
  searchContactForm!: FormGroup;

  response!: TreeData;

  initSearchForm() {
    this.searchContactForm = new FormGroup({
      institut: new FormControl(''),
      pays: new FormControl('', [Validators.required]),
      type: new FormControl(''),
      ville: new FormControl(''),
    });
  }


  navigateToCreate(){
    this.router.navigate(['/contact/creer']);
  }

  loadPage() {
    this.startIndex = (this.page - 1) * this.pageSize + 1;
    this.endIndex = (this.page - 1) * this.pageSize + this.pageSize;
    if (this.endIndex > this.totalRecords) {
      this.endIndex = this.totalRecords;
    }
    this.paginationDatas = paginationlist.slice(this.startIndex - 1, this.endIndex);
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
    // Vous pouvez faire ce que vous voulez avec l'option sélectionnée ici
    this.selectedInstitut = cab;
    if (this.searchContactForm) {
      const institutControl = this.searchContactForm.get('institut');
      if (institutControl) {
        // Maintenant, vous pouvez utiliser institutControl en toute sécurité
        // Par exemple, obtenir la valeur de contrôle
        institutControl.setValue(cab.nom);
        this.filteredInstitut = cab;
        this.receivedData = cab.id;
        this.getContactByInstitut(cab.id,this.currentPage);
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

  getTreeByCity(id:number){
    this.contactService.filterTreeByCity(id).subscribe((res) => {
      this.response = res;
      this.contacts = [];
    });
  }

  getTreeByCountrie(id:number){
    this.contactService.filterTreeByCountrie(id).subscribe((res) => {
      this.response = res;
      this.contacts = [];
    });
  }

  getTreeByType(id:number){
    this.contactService.filterTreeByType(id).subscribe((res) => {
      this.response = res;
      this.contacts = [];

    });
  }

  getContactByInstitut(id:number, page: any){
    this.contactService.getContactByInstitut(id, page).subscribe((res) => {
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
    this.getTreeByCountrie(event.target.value);
    this.listVillesParPays(event.target.value); 
  }

  onVilleSelectChange(event: any){
    this.getTreeByCity(event.target.value);
    this.listTypesParVille(event.target.value) 
  }

  onTypeSelectChange(event: any){
    this.listInstitutParType(event.target.value) 
    this.getTreeByType(event.target.value);
  }

  paginateContact(page: any){
    this.currentPage = page;
    this.getContactByInstitut(this.receivedData, this.currentPage);
  }



}
