import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {

  username: string = '';
  userData: any = {};

  constructor(private httpClient: HttpClient, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    const storedUsername = this.authService.getUsername();
    if (storedUsername !== null) {
      this.username = storedUsername;
      console.log('Username:', this.username)
      this.getUserData();
    } else {
      console.error('Error');
    }
  }

  getUserData() {
    const url = 'http://localhost:4000/api/getUserData/' + this.username;
    this.httpClient.get(url).subscribe(
      (data: any) => {
        this.userData = data;
        console.log(this.userData);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateUser() {
    console.log("actualizando")
    const url = 'http://localhost:4000/api/updateUserById/' + this.userData._id;
    this.httpClient.put(url, this.userData).subscribe(
      (response: any) => {
        this.showSuccessAlert()
        console.log('User updated successfully:', response);
      },
      (error) => {
        this.showSuccessAlertError()
        console.error('Error updating user:', error);
      }
    );
  }

  deleteUser() {
    console.log("eliminando")
    const url = 'http://localhost:4000/api/deleteUserById/' + this.userData._id;
    this.httpClient.delete(url).subscribe(
      (response: any) => {
        console.log('User deleted successfully:', response);
        this.showSuccessDeleteAlert();
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Error deleting user:', error);
        this.showSuccessDeleteAlertError();
      }
    );
  }

  showSuccessDeleteAlert() {
    swal.fire({
      icon: 'success',
      title: 'Usuario eliminado con éxito',
      showConfirmButton: false,
      timer: 1600
    });
  }

  showSuccessDeleteAlertError() {
    swal.fire({
      icon: 'error',
      title: 'Error al eliminar usuario',
      showConfirmButton: false,
      timer: 1600
    });
  }

  showSuccessAlert() {
    swal.fire({
      icon: 'success',
      title: 'Usuario modificado con éxito',
      showConfirmButton: false,
      timer: 1600
    });
  }

  showSuccessAlertError() {
    swal.fire({
      icon: 'error',
      title: 'Error al modificar usuario',
      showConfirmButton: false,
      timer: 1600
    });
  }

}
