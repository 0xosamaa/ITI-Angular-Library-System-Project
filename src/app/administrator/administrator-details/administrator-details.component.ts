import { Component, Input } from '@angular/core';
import { Administrator } from 'src/app/_models/administrator';

@Component({
  selector: 'app-administrator-details',
  templateUrl: './administrator-details.component.html',
  styleUrls: ['./administrator-details.component.css'],
})
export class AdministratorDetailsComponent {
  @Input() currentAdmin: Administrator | null = null;
  visible: boolean = false;

  showDetails() {
    this.visible = true;
  }
}
