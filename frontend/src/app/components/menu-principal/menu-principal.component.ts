import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent {

  constructor(private router: Router, private httpClient: HttpClient, private authService: AuthService) { }

  private URL = environment.BURL;
  userData: any = {};

  goToRoute(route: string) {
    this.router.navigateByUrl(route);
  }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.httpClient.get(`${this.URL}/getUserData/` + this.authService.getUsername()).subscribe(
      (data: any) => {
        this.userData = data;
        console.log("aqui " + this.userData._id);
        this.authService.setUserId(this.userData._id);
      },
      (error) => {
        console.log(error);
      }
    );
  }


}

