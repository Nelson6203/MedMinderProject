import { Component } from '@angular/core';

@Component({
  selector: 'app-help-and-support',
  templateUrl: './help-and-support.component.html',
  styleUrls: ['./help-and-support.component.css']
})
export class HelpAndSupportComponent {
  tutorial1Visible = false;
  tutorial2Visible = false;
  tutorial3Visible = false;
  tutorial4Visible = false;

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
}