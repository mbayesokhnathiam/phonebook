import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Institut } from 'src/app/pages/contact/models/institut.model';
import { Pays } from 'src/app/pages/contact/models/pays.model';
import { TypeInstitut } from 'src/app/pages/contact/models/type.model';
import { Ville } from 'src/app/pages/contact/models/ville.model';
import { ContactService } from 'src/app/pages/contact/services/contact.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-import-contacts',
  templateUrl: './import-contacts.component.html',
  styleUrl: './import-contacts.component.scss'
})
export class ImportContactsComponent implements OnInit {

  selectedFile: File | null = null;

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
  fileEvent: any;

  selectedVilleId: any;
  selectedTypeId: any;

  initCreateForm() {
    this.createContactForm = new FormGroup({
      institutId: new FormControl('', [Validators.required]),
      pays: new FormControl(''),
      ville: new FormControl(''),
      type: new FormControl(''),
      file: new FormControl(''),
      fichier: new FormControl(null, [Validators.required]),
    });
  }

  constructor(private contactService: ContactService, private router: Router) { }
  ngOnInit(): void {
    this.initCreateForm();
    this.listPays();
  }

  get f(): { [p: string]: AbstractControl } {
    return this.createContactForm.controls;
  }

  onImageChangeEvent(e: any) {
    const reader = new FileReader();

    if (e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      reader.readAsDataURL(file);
      this.fileEvent = e.target.files[0];
      reader.onload = () => {
        this.createContactForm.patchValue({
          fichier: reader.result
        });

      };

    }
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
    this.contactService.getTypes().subscribe((res) => {
      this.types = res;
    });
  }

  listInstitutParTypeAndVille(id: number, ville: number){
    this.contactService.getInstitutByTypeAndVille(id, ville).subscribe((res) => {
      this.instituts = res;
    });
  }


  onCountrieSelectChange(event: any){
    this.listVillesParPays(event.target.value); 
  }

  onVilleSelectChange(event: any){
    this.selectedVilleId = event.target.value;
    this.listTypesParVille(event.target.value)
    if(this.selectedTypeId && this.selectedVilleId){
      this.listInstitutParTypeAndVille(this.selectedTypeId, event.target.value)
    } 
  }

  onTypeSelectChange(event: any){
    this.selectedTypeId = event.target.value;

    if(this.selectedTypeId && this.selectedVilleId){
      this.listInstitutParTypeAndVille(event.target.value, this.selectedVilleId)
    }
     
  }

  saveContact(){

    Swal.fire({
      title: "Confirmation?",
      text: "Voulez-vous importer les contacts contenus dans le fichier!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#008000",
      cancelButtonColor: "#d33",
      cancelButtonText: "NON",
      confirmButtonText: "OUI"
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        formData.append('institutId', this.f['institutId'].value);
        formData.append('fichier', this.fileEvent);
        this.contactService.importContact(formData).subscribe((res) => {

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

          
    
        },(err) => {

          Swal.fire({
            title: "Erreur!",
            text: err,
            icon: "error"
          });
        });
        
      }
    })
  }


}
