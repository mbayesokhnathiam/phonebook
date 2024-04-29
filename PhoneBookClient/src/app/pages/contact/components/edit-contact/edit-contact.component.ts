import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Pays } from '../../models/pays.model';
import { Ville } from '../../models/ville.model';
import { TypeInstitut } from '../../models/type.model';
import { Institut } from '../../models/institut.model';
import { ContactService } from '../../services/contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrl: './edit-contact.component.scss'
})
export class EditContactComponent implements OnInit {

  pays: Pays[] = [];



  villes: Ville[] = [];

  types: TypeInstitut[] = [];

  
  updateContactForm!: FormGroup;
  nomInstitut: string = '';
  // filter institut
  myControl = new FormControl();

  instituts: Institut[] = []; // Assurez-vous d'avoir la bonne interface Cabinet


  // Filtrer les cabinets en fonction de la saisie de l'utilisateur
  filteredInstituts: Institut[] = [];
  showOptions: boolean = false;
  selectedInstitut!: Institut;
  filteredInstitut!: Institut;

  contactEdit!: Contact;
  contactId!: number;
  selectedVilleId: any;

  initCreateForm() {
    this.updateContactForm = new FormGroup({
      id: new FormControl(''),
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

  preRemplirFormulaire(objetDonnees: any) {
    this.updateContactForm.patchValue({
      id: objetDonnees.id,
      prenom: objetDonnees.prenom || '',
      nom: objetDonnees.nom || '',
      fonction: objetDonnees.fonction || '',
      telephone_fixe: objetDonnees.telephone_fixe || '',
      telephone_mobile: objetDonnees.telephone_mobile || '',
      telephone_domicile: objetDonnees.telephone_domicile || '',
      email: objetDonnees.email || '',
      commentaire: objetDonnees.commentaire || '',
      institutId: objetDonnees.institutId,
      pays: objetDonnees.institut?.ville?.pays?.id,
      ville: objetDonnees.institut?.ville?.id,
      type: objetDonnees.institut?.typeinstitut?.id
    });
  }

  constructor(private contactService: ContactService, private router: Router,private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.contactId = parseInt(atob(this.activatedRoute.snapshot.params['id']));
    this.getContactById(this.contactId);
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
    if (this.updateContactForm) {
      const institutControl = this.updateContactForm.get('institutId');
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

  getContactById(id:number){
    this.contactService.getContactByid(id).subscribe((res) => {
      this.contactEdit = res;
      this.preRemplirFormulaire(this.contactEdit);
      
      this.updateContactForm.get('pays')?.setValue(this.contactEdit.institut.ville.pays.id);
      this.listVillesParPays(this.contactEdit.institut.ville.pays.id);
      this.updateContactForm.get('ville')?.setValue(this.contactEdit.institut.ville.id);
      this.listTypesParVille(this.contactEdit.institut.ville.id);
      this.updateContactForm.get('type')?.setValue(this.contactEdit.institut.typeInstitutId);
      this.listInstitutParTypeAndValue(this.contactEdit.institut.typeInstitutId, this.contactEdit.institut.ville.id);
      this.filteredInstitut=this.contactEdit.institut;
      this.nomInstitut = this.contactEdit.institut.nom;
      this.selectedInstitut = this.contactEdit.institut;
      this.filteredInstitut = this.contactEdit.institut;
      this.updateContactForm.get('institutId')?.setValue(this.contactEdit.institut.id);
      this.updateContactForm.get('id')?.setValue(this.contactEdit.id);
      
    });
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
    this.contactService.getTypes().subscribe((res) => {
      this.types = res;
    });
  }

  listInstitutParTypeAndValue(id: number, ville: number){
    this.contactService.getInstitutByTypeAndVille(id, ville).subscribe((res) => {
      this.instituts = res;
    });
  }


  onCountrieSelectChange(event: any){
    this.listVillesParPays(event.target.value); 
    this.types = [];
    this.instituts = [];
  }

  onVilleSelectChange(event: any){
    this.selectedVilleId = event.target.value;
    this.listTypesParVille(event.target.value) 
    this.instituts = [];
  }

  onTypeSelectChange(event: any){
    this.nomInstitut = '';
    this.selectedVilleId = event.target.value;
    this.listInstitutParTypeAndValue(event.target.value, this.selectedVilleId); 
  }

  saveContact(){

    Swal.fire({
      title: "Confirmation?",
      text: "Voulez-vous mettre à jour ce contact!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#008000",
      cancelButtonColor: "#d33",
      cancelButtonText: "NON",
      confirmButtonText: "OUI"
    }).then((result) => {
      if (result.isConfirmed) {
        this.contactService.createContact(this.updateContactForm.value).subscribe((res) => {
 
          if(res.status === 201){
            Swal.fire({
              title: "Enregistré!",
              text: res.message,
              icon: "success"
            });

            this.nomInstitut = '';
            this.updateContactForm.reset();
            this.router.navigate(['/contact/criteria/search']);
      
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
