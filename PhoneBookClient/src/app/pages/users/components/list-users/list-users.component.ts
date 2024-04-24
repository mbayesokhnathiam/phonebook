import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserPagination } from '../../models/page-user.model';
import { UsersService } from '../../services/users.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.scss'
})
export class ListUsersComponent implements OnInit{

  users: User[] = [];
  usersPages!: UserPagination;
  currentPage: number = 1;


  createUserForm!: FormGroup;

  constructor(private userService: UsersService){

  }

  ngOnInit(): void {
    this.getUsersList(this.currentPage);
    this.initCreateForm();
  }

  initCreateForm() {
    this.createUserForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
    });
  }

  getUsersList(page: any){
    this.userService.paginateUsers(page).subscribe((res) => {
      this.usersPages = res;
      this.users = this.usersPages.data;
    });
  }

  saveUser(){

    Swal.fire({
      title: "Confirmation",
      text: "Voulez-vous enregistrer cet utilisateur?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#008000",
      cancelButtonColor: "#d33",
      cancelButtonText: "NON",
      confirmButtonText: "OUI"
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.createUser(this.createUserForm.value).subscribe((res) => {
 
          if(res.status === 201){
            Swal.fire({
              title: "Enregistré!",
              text: res.message,
              icon: "success"
            });
            this.createUserForm.reset();
            this.currentPage = 1;
            this.getUsersList(this.currentPage);
          }else{
            Swal.fire({
              title: "Erreur!",
              text: res.message,
              icon: "error"
            });
          }

          
    
        },(error) => {
          Swal.fire({
            title: "Erreur!",
            text: error,
            icon: "error"
          });
        });
        
      }
    })
  }

  reset(data: any){
    Swal.fire({
      title: "Confirmation",
      text: "Voulez-vous réinitialiser le mot de passe cet utilisateur?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#008000",
      cancelButtonColor: "#d33",
      cancelButtonText: "NON",
      confirmButtonText: "OUI"
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.resetPasswordUser(data.id).subscribe((res) => {
 
          if(res.status === 201){
            Swal.fire({
              title: "Mot de passe",
              text: res.message,
              icon: "success"
            });
            this.createUserForm.reset();
            this.currentPage = 1;
            this.getUsersList(this.currentPage);
          }else{
            Swal.fire({
              title: "Erreur!",
              text: res.message,
              icon: "error"
            });
          }

          
    
        },(error) => {
          Swal.fire({
            title: "Erreur!",
            text: error,
            icon: "error"
          });
        });
        
      }
    })
  }

}
