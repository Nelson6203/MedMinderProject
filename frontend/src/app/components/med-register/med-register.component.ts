import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import swal from 'sweetalert2';
@Component({
  selector: 'app-med-register',
  templateUrl: './med-register.component.html',
  styleUrls: ['./med-register.component.css']
})
export class MedRegisterComponent {

  constructor(private httpClient: HttpClient, private router: Router) { }

  /*
  private URL = environment.BURL;

  onRegisterUser() {
    this.httpClient.post(`${this.SERVER}/registerTournament`, form.value).subscribe(response => {
      console.log(response);
      this.router.navigateByUrl('/');
    });
    this.showSuccesslert();

  }
  */

  showSuccesslert() {
    swal.fire({
      icon: 'success',
      title: 'Medicamento agregado con éxito',
      showConfirmButton: false,
      timer: 1600
    });
  }



}
