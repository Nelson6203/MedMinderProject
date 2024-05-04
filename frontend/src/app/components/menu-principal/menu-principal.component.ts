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

  constructor(private router: Router, private httpClient: HttpClient, public authService: AuthService) { }

  private URL = environment.BURL;
  userData: any = {};
  medList: any
  userid: string = '';

  goToRoute(route: string) {
    this.router.navigateByUrl(route);
  }

  ngOnInit(): void {
    this.getUserData();
    this.iniciarRevision();
  }
  getUserData() {
    this.httpClient.get(`${this.URL}/getUserData/` + this.authService.getUsername()).subscribe(
      (data: any) => {
        this.userData = data;
        console.log("aqui " + this.userData._id);
        this.authService.setUserId(this.userData._id);
        this.obtenerMeds();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  obtenerMeds(){
    this.userid = this.authService.getUserId()!;
    this.httpClient.get(`${this.URL}/getMedById/` + this.userid).subscribe(
        (data) => {
            this.medList = data;
            this.authService.setMedList(this.medList);
        },
        (error) => {
            console.error('No se encontraron medicamentos para ese ID de usuario: ');
        }
    );
}

iniciarRevision() {
  // Ejecuta revisarHoras cada minuto
  setInterval(() => this.authService.revisarHoras(), 1000);
}
}

