import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm,FormGroup } from '@angular/forms';
import swal from 'sweetalert2';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent {

  constructor(private httpClient: HttpClient, private router: Router) { }
  registerForm!: FormGroup;


  username: string = '';
  email: string = '';
  password: string = '';
  isButtonDisabled: boolean = true;
  errorMessage: string = '';

  SERVER: string =  "";


  onRegisterUser(form: NgForm) {
    this.httpClient.post(`http://localhost:4000/api/registerUser`, form.value).subscribe(response => {
      console.log(response);
      this.router.navigateByUrl('/');
    });
  }

  goToRoute(route: string) {
    this.router.navigateByUrl(route);
  }

  validate(): void {
    this.isButtonDisabled = this.username === '' || this.email === '' || this.password === '';
    this.errorMessage = this.isButtonDisabled ? 'Los campos no pueden estar vacíos' : '';
  }

  showSuccessAlert() {
    swal.fire({
      icon: 'success',
      title: 'Registro con éxito',
      showConfirmButton: false,
      timer: 1600
    });
  }

}
