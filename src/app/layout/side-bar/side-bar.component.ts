import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {

    constructor(public authService:AuthService) {  }
    ngOnChanges(): void {
        console.log("ngOnChanges");
    }

}
