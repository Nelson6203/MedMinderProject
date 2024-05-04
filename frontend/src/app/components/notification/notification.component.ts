import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {

  constructor(private router: Router, public authService: AuthService){}

  goToRoute(route: string) {
    this.router.navigateByUrl(route);
  }

  ngOnDestroy() {
    this.authService.closeNotification();
  }
}
