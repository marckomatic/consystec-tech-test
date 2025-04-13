import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../services/alert/alert.service';
import { AccessService } from '../../services/access/access.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: false
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private alertService:AlertService,
    private accessService:AccessService
  ) {
    this.signupForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
      repetirContrasena: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log('holi')
    if(this.signupForm.value.contrasena !== this.signupForm.value.repetirContrasena){
      this.alertService.openSnackBar("Los password no coinciden", 'Ok')
    }
    else if(!this.signupForm.valid){
      this.alertService.openSnackBar("Faltan campos requeridos", 'Ok')
    }else{
      this.accessService.register(this.signupForm.value.nombre, this.signupForm.value.correo, this.signupForm.value.contrasena).then(
        (result)=>{
          this.alertService.openSnackBar("Registrado exitosamente!", 'Ok');
        }
      ).catch(error=>{
        this.alertService.openSnackBar(error.error, 'Ok');
        console.error(error)
      })
    }
    console.log(this.signupForm.value);
  }
}
