import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { MatDialog } from "@angular/material/dialog"
import { NotificationComponent } from '../components/notification/notification.component';
import { Med } from '../models/med'

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  listaMeds: any

  constructor(private httpClient: HttpClient, private matDialog: MatDialog) {}

  private username: string = '';
  private userId: string = '';
  public alarma: boolean =  false;
  public alarmaActivada: boolean = false;

  private nombre: string = '';
  private dosis: string = '';
  private horaMedActivo: string = '';
  private nota: string = '';

  public horaActiva: string = '';

  private URL = environment.BURL;

  public notificationOpened = false;

  listaMed: any[] = [];
  medLista: any[] = [];

  public audio = new Audio();

  login(user: User) {
    return this.httpClient.post<any>(`${this.URL}/login`, user);
  }

  setUsername(username: string) {
    this.username = username;
  }

  getUsername(): string | null {
    return this.username;
  }

  setUserId(userId: string) {
    this.userId = userId;
  }

  getUserId(): string | null {
    return this.userId;
  }

  openNotification(){
    this.audio.src = "assets/audio/alarma1.mp3";
    this.audio.addEventListener('ended', () => this.audio.play());
    this.audio.play();
    this.matDialog.open(NotificationComponent);
  }

  closeNotification() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.audio.removeEventListener('ended', () => this.audio.play());
    }
    this.matDialog.closeAll();
  }

  setMedList(ListaMeds: Med[]){
    this.listaMeds = ListaMeds;
  }

  getMedList(){
    return this.listaMeds;
  }

  revisarHoras() {
    let fechaActual = new Date();
    let horaActual = fechaActual.getHours().toString().padStart(2, '0') + ':' + fechaActual.getMinutes().toString().padStart(2, '0');
    let fechaSistemaActual = fechaActual.toISOString().slice(0,10);

    for (let med of this.listaMeds) {
      //console.log("el med es: ", med)
      let fechaInicio = new Date(med.fechaInicio);
      let fechaInicioSinHora = fechaInicio.toISOString().slice(0,10);
      let horaMed = fechaInicio.getHours().toString().padStart(2, '0') + ':' + fechaInicio.getMinutes().toString().padStart(2, '0');

      if (fechaInicioSinHora === fechaSistemaActual){
        if (horaMed === horaActual) {
          if(!this.notificationOpened) {
            this.nombre = med.nombre;
            this.dosis = med.dosis;
            this.horaMedActivo = horaMed;
            this.nota = med.notas;

            this.horaActiva = horaActual;
            this.openNotification();
            this.notificationOpened = true;
          }
          this.alarma= true;
        }
        if(this.horaActiva !== horaActual ) {
          this.notificationOpened = false;
          this.closeNotification();
          this.alarma = false;
        }
      }
    }
  }

  getMed() {
    return this.medLista;
  }

  getNombre(){
    return this.nombre;
  }

  getDosis(){
    return this.dosis;
  }

  gethoraMed() {
    return this.horaMedActivo;
  }

  getnota(){
    return this.nota;
  }

}
