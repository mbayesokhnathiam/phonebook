import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

// Login Auth
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * Login Component
 */
export class LoginComponent implements OnInit {

  // Login Form
  loginForm!: FormGroup;
  submitted = false;
  fieldTextType!: boolean;

  returnUrl!: string;
  // set the current year
  year: number = new Date().getFullYear();

  initCreateForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.initCreateForm();
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Form submit
   */
  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe((res) => {

      if(res.status === 'success'){
        this.authService.setToken(res.authorisation.token);
        this.router.navigate(['']);
        return;
      }else{
        Swal.fire({
          title: "Erreur!",
          text: 'Adresse e-mail et/ou mot de passe invalide(s) !',
          icon: "error"
        });
        return;
      }

      

    },
    (error) => {

      // Gestion des erreurs HTTP
      if (error === 'Unauthorized') {
        // Erreur d'authentification (non autorisé)
        this.loginForm.reset();
        Swal.fire({
          title: "Erreur!",
          text: "Vos identifiants sont incorrects. Veuillez réessayer.",
          icon: "error"
        });
      } else {
        // Autres erreurs HTTP
        Swal.fire({
          title: "Erreur!",
          text: "Une erreur s'est produite. Veuillez réessayer plus tard.",
          icon: "error"
        });
      }
    });
  }

  /**
   * Password Hide/Show
   */
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

}
