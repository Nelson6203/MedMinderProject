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

  onSaveMedication() {
    const formData = {
      nombre: (document.getElementById('nombreMed') as HTMLInputElement).value,
      dosis: (document.getElementById('dosis') as HTMLInputElement).value,
      frecuenciaDosis: (document.getElementById('frecuenciaDosis') as HTMLInputElement).value,
      fechaInicio: (document.getElementById('fechaInico') as HTMLInputElement).value,
      tipoTratamiento: (document.querySelector('input[name="medType"]:checked') as HTMLInputElement).value,
      duracion: (document.getElementById('duracion') as HTMLInputElement).value,
      horario: this.getSelectedHorario(),
      notas: (document.getElementById('inputusername2') as HTMLTextAreaElement).value,
      userID: 'userIdPlaceholder' // Aquí debes reemplazarlo con la lógica para obtener el ID del usuario
    };

    this.httpClient.post<any>('/registerMed', formData)
      .subscribe(
        response => {
          console.log(response);
          this.showSuccessAlert();
        },
        error => {
          console.error('Error al guardar el medicamento:', error);
        }
      );
  }

  getSelectedHorario(): string {
    let horario = '';
    if ((document.getElementById('flexCheckChecked1') as HTMLInputElement).checked) {
      horario += 'Mañana ';
    }
    if ((document.getElementById('flexCheckChecked2') as HTMLInputElement).checked) {
      horario += 'Tarde ';
    }
    if ((document.getElementById('flexCheckChecked3') as HTMLInputElement).checked) {
      horario += 'Noche';
    }
    return horario.trim();
  }

  showSuccessAlert() {
    swal.fire({
      icon: 'success',
      title: 'Medicamento agregado con éxito',
      showConfirmButton: false,
      timer: 1600
    });
  }
}
