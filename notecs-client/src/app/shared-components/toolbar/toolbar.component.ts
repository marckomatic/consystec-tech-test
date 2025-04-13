import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, CommonModule, MatTooltipModule],
  selector: 'app-toolbar',
  standalone: true,
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {
  urlActual:string;
  constructor(private router: Router, private authService:AuthService){
    this.urlActual = this.router.url;
  }

  navigateToLogin(){
    this.router.navigate(['login']);
  }

  logout(){
    this.authService.logout()
    this.router.navigate(['login'])
  }
}
