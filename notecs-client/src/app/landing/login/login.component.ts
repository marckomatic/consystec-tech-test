import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../services/alert/alert.service';
import { AuthService } from '../../services/auth/auth.service';
import { AccessService } from '../../services/access/access.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private alertService:AlertService, private authService:AuthService,
    private accessService:AccessService, private router:Router
  ) {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required],
    });
  }

  onSubmit() {
    if(!this.loginForm.valid){
      this.alertService.openSnackBar("Faltan campos requeridos", "Ok");
    }else{
      this.accessService.login(this.loginForm.value.usuario, this.loginForm.value.contrasena).then(
        (result:any)=>{
          this.authService.setCurrentUser(result.token)
          this.router.navigate(['dashboard'])
        }
      ).catch(
        (error:any)=>{
          console.error(error)
          this.alertService.openSnackBar(error.error, "Ok")
        }
      )
    }
  }
}
