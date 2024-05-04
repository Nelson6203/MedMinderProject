import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../services/auth.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-med-list',
  templateUrl: './med-list.component.html',
  styleUrls: ['./med-list.component.css']
})
export class MedListComponent {

  constructor(private http: HttpClient, private router: Router, private authService: AuthService ) { }

  private URL = environment.BURL;
  medList: any
  userData: any = {};
  userid: string = '';

  ngOnInit(): void {
    this.getAllMeds();
  }

  getAllMeds() {
    this.userid = this.authService.getUserId()!;
    console.log("userid: " + this.userid);
    this.showAlertLoad();
    this.http.get(`${this.URL}/getMedById/` + this.userid).subscribe(
        (data) => {
            this.medList = data;
            swal.close();
            this.authService.setMedList(this.medList);
        },
        (error) => {
            console.error('No se encontraron medicamentos para ese ID de usuario: ');
            swal.close();
        }
    );
  }

  deleteMed(id: string){
    this.http.delete(`${this.URL}/deleteMedById/` + id).subscribe(data  => {
    this.getAllMeds();
    });
  }

  showDeleteAlert() {
    swal.fire({
      icon: 'success',
      title: 'Eliminado con éxito',
      showConfirmButton: false,
      timer: 1500
    });
  }

  showAlertLoad(){
    swal.fire({
      title: 'Cargando...',
      text: 'Espere un momento por favor',
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,

    });
    swal.showLoading();
  }
}



