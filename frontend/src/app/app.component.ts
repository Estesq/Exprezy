import { Component } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { MyServiceService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Exprezy';
}
