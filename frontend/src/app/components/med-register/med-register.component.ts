import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm,FormGroup, Validators, FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../services/auth.service';

import swal from 'sweetalert2';
@Component({
  selector: 'app-med-register',
  templateUrl: './med-register.component.html',
  styleUrls: ['./med-register.component.css']
})
export class MedRegisterComponent {

  constructor(private httpClient: HttpClient, private router: Router, private fb: FormBuilder,private authService: AuthService ) { }

  registerForm!: FormGroup;

  private URL = environment.BURL;

  public maniana: boolean = false;
  public tarde: boolean = false;
  public noche: boolean = false;

  public capsula: boolean = false;
  public jarabe: boolean = false;
  public otro: boolean = false;

  horarioList: any[] = [];
  tipoMedicamento: string = '';

  nombre: string = '';
  dosis: string = '';
  frecuenciaDosis: string = '';
  duracion: string = '';
  fechaInicio: string = '';
  isButtonDisabled: boolean = true;
  errorMessage: string = '';
  horarioListaEnviar: string = '';
  notas: string = '';

  opcionesSeleccionadas: string[] = [];

  verificandoHorario(){
    if (this.maniana && !this.horarioList.includes("Mañana")){
      this.horarioList.push("Mañana");
    } else if (!this.maniana) {
      const index = this.horarioList.indexOf("Mañana");
      if (index > -1) {
        this.horarioList.splice(index, 1);
      }
    }
    if(this.tarde && !this.horarioList.includes("Tarde")){
      this.horarioList.push("Tarde");
    } else if (!this.tarde){
      const index = this.horarioList.indexOf("Tarde");
      if (index > -1) {
        this.horarioList.splice(index, 1);
      }
    }
    if(this.noche && !this.horarioList.includes("Noche")){
      this.horarioList.push("Noche");
    } else if (!this.noche) {
      const index = this.horarioList.indexOf("Noche");
      if (index > -1) {
        this.horarioList.splice(index, 1);
      }
    }
    console.log("horario: " + this.horarioList);
  }

  verificandoTipoMedicamento(tipo: string){
    this.tipoMedicamento = '';
    this.tipoMedicamento = tipo;
    console.log("tipo medicamento: " + this.tipoMedicamento);
  }

  validate(): void {
    this.isButtonDisabled = this.nombre === '' || this.dosis === '' || this.frecuenciaDosis === '' || this.fechaInicio === '' || this.duracion === '';
    this.errorMessage = this.isButtonDisabled ? 'Los campos no pueden estar vacíos' : '';
  }

  onRegisterMed(form: NgForm){
    let horarioString = this.horarioList.join(", ");
    let userid = this.authService.getUserId()!;

    this.registerForm = this.fb.group({
      nombre: form.value.nombre,
      dosis: form.value.dosis,
      frecuenciaDosis: form.value.frecuenciaDosis,
      fechaInicio: form.value.fechaInicio,
      tipoTratamiento: this.tipoMedicamento,
      duracion: form.value.duracion,
      horario: horarioString,
      notas: form.value.notas,
      userID: userid
    });

    this.httpClient.post(`${this.URL}/registerMed`, this.registerForm.value).subscribe(
      response => {
          console.log(response);
          this.showSuccesslert();
          this.router.navigateByUrl('/menuPrincipal');
      },
      error => {
          console.log(error);
          this.showErrorAlert();
      }
  );
}

  showSuccesslert() {
    swal.fire({
      icon: 'success',
      title: 'Medicamento agregado con éxito',
      showConfirmButton: false,
      timer: 1600
    });
  }

  showErrorAlert() {
    swal.fire({
      icon: 'error',
      title: 'Error al agregar medicamento',
      showConfirmButton: false,
      timer: 1600
    });
  }



}
