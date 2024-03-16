import { Component, OnInit } from '@angular/core';
import { NgForm,FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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

  ngOnInit() {

  }

  onLogin(form: NgForm) {
    console.log('Usuario:', form.value.username);
    console.log('Contraseña:', form.value.password);
    this.authService.login(form.value).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/registerUser']);
      },
      err => {
        console.log(err);
        console.log('errorrrr');
        this.error = err.message;
      }
    );
  }

  }


