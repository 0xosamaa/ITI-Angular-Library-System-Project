import { Component, Input } from '@angular/core';
import { Borrow } from 'src/app/_models/borrow';

@Component({
  selector: 'app-borrow-details',
  templateUrl: './borrow-details.component.html',
  styleUrls: ['./borrow-details.component.css'],
})
export class BorrowDetailsComponent {
  @Input() currentBorrow: Borrow | null = null;
  visible: boolean = false;

  showDetails() {
    this.visible = true;
  }
}
