import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private httpClient: HttpClient, private router: Router, private authService: AuthService) { }
  error: any;
  username: string = '';
  password: string = '';

  isButtonDisabled: boolean = true;
  errorMessage: string = '';

  ngOnInit() {
  }

  onLogin(form: NgForm) {
    console.log('Usuario:', form.value.username);
    console.log('Contraseña:', form.value.password);
    this.authService.login(form.value).subscribe(
      res => {
        console.log(res);
        this.showSuccessAlert();
        this.router.navigate(['/menuPrincipal']);
      },
      err => {
        this.showSuccessAlertError();
        console.log(err);
        console.log('errorrrr');
        this.error = err.message;
      }
    );
  }

  goToRoute(route: string) {
    this.router.navigateByUrl(route);
  }

  validate(): void {
    this.isButtonDisabled = this.username === '' || this.password === '';
    this.errorMessage = this.isButtonDisabled ? 'Los campos no pueden estar vacíos' : '';
  }


  showSuccessAlert() {
    swal.fire({
      icon: 'success',
      title: 'Inicio de sesión con éxito',
      showConfirmButton: false,
      timer: 1600
    });
  }

  showSuccessAlertError() {
    swal.fire({
      icon: 'error',
      title: 'Error al iniciar sesión',
      showConfirmButton: false,
      timer: 1600
    });
  }

  }


