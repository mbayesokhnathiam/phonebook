import { Component, HostListener, OnInit } from '@angular/core';
import { TypeItem } from 'src/app/pages/settings/models/parametre.model';
import { FormatItem } from '../../models/format.model';
import { FormControl } from '@angular/forms';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrl: './advanced-search.component.scss'
})
export class AdvancedSearchComponent  implements OnInit{

  constructor(private contactService: ContactService){}



  contacts: FormatItem[] = [];

  data: any;
 

  nomTypeSearch: string = '';
  // filter institut
  myControl = new FormControl();

  // Filtrer les cabinets en fonction de la saisie de l'utilisateur

  filteredContactSearch: FormatItem[] = [];
  showOptionsSearch: boolean = false;
  selectedContact!: FormatItem;
  filteredContact!: FormatItem;

  ngOnInit(): void {
    this.formatContact();
  }

  
  formatContact(){
    this.contactService.formatContact().subscribe((res) => {
      this.contacts = res;
    });
  }

  showContact(id: number){
    this.contactService.getContactByid(id).subscribe((res) => {
      this.data = res;
    });
  }

  // search

  onInputChangeSearch(target: any) {
    this.filteredContactSearch = this.contacts.filter(i =>
      i.nom.toLowerCase().includes(target.value.toLowerCase())
    );
    this.showOptionsSearch = true;
  }

  toggleOptionsSearch(event: MouseEvent) {
    this.showOptionsSearch = !this.showOptionsSearch;
    event.stopPropagation(); // Empêche la propagation de l'événement de clic pour éviter la fermeture immédiate
  }

  @HostListener('document:click', ['$event'])
  clickOutsideSearch(event: MouseEvent) {
    if (!this.showOptionsSearch) {
      return;
    }
    const target = event.target as HTMLElement;
    if (!target.closest('.autocomplete-list')) {
      this.showOptionsSearch = false;
    }
  }

  selectOptionSearch(cab:FormatItem) {
    // Vous pouvez faire ce que vous voulez avec l'option sélectionnée ici
    this.selectedContact = cab;
    this.showContact(cab.id);
    this.showOptionsSearch = !this.showOptionsSearch;
    this.nomTypeSearch = cab.nom

    if(event){
      const target = event.target as HTMLElement;
      if (!target.closest('.autocomplete-list')) {
        this.showOptionsSearch = false;
      }
    }
    
  }

  clearSearch() {
    this.nomTypeSearch = '';
    this.data = null;
    this.filteredContactSearch = []; // Réinitialiser la valeur de recherche
}


  // End search

  
}


