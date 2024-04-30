import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-profile',
  templateUrl: './help-and-support.component.html',
  styleUrls: ['./help-and-support.component.css']
})

export class HelpAndSupportComponent {

  tutorial1Visible = false;
  tutorial2Visible = false;
  tutorial3Visible = false;
  tutorial4Visible = false;
  mensaje: string = '';
  userData: any = {};
  username: string = '';
  isButtonDisabled: boolean = false;
  errorMessage: string = '';
  private URL = environment.BURL;

  constructor(private httpClient: HttpClient, private authService: AuthService) {
    this.getUserData();
  }

  toggleTutorial1(): void {
    this.tutorial1Visible = !this.tutorial1Visible;
  }

  toggleTutorial2(): void {
    this.tutorial2Visible = !this.tutorial2Visible;
  }

  toggleTutorial3(): void {
    this.tutorial3Visible = !this.tutorial3Visible;
  }

  toggleTutorial4(): void {
    this.tutorial4Visible = !this.tutorial4Visible;
  }

  getUserData() {
    const storedUsername = this.authService.getUsername();
    if (storedUsername !== null) {
      this.httpClient.get(`${environment.BURL}/getUserData/` + storedUsername).subscribe(
        (data: any) => {
          this.userData = data;
          console.log('Datos del usuario:', this.userData);
        },
        (error) => {
          console.log('Error al obtener datos del usuario:', error);
        }
      );
    } else {
      console.error('Error: No se encontró un nombre de usuario almacenado en la sesión.');
    }
  }

  enviarMensaje(): void {
    if (this.mensaje.trim() !== '') {
      const mensajeData = {
        usuario: this.userData.username,
        id: this.userData._id,
        nombre: this.userData.username,
        correo: this.userData.email,
        consulta: this.mensaje
      };
      this.httpClient.post(`${this.URL}/send-email`, mensajeData, { responseType: 'text' })
        .subscribe(response => {
          console.log('Respuesta del backend:', response);
        }, error => {
          console.error('Error al enviar el mensaje:', error);
        });
    }
  }

}
