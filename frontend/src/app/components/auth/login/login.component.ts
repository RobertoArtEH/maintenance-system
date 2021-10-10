import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { errorMessage, successDialog } from '../../resources/alert';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup

  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.buildForm()
  }

  buildForm(): void {
    this.loginForm = this.fb.group({
      email: ['',[Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      password: ['', [Validators.required]]
    });
  }

  login(){
    if (this.loginForm.valid){
      this.authenticationService.login(this.loginForm.value).subscribe( res => {
        this.authenticationService.setToken(res.token, res.token.refresh_token);
        if (res.status){
          successDialog('Bienvenido').then(() =>{
            this.authenticationService.setToken(res.token.token, res.token.refresh_token);
            return this.router.navigate(['/home']);
          })
        } else{
          errorMessage('Error')
        }
      }, res => {
        console.log(res)
        errorMessage('El correo electrónico y/o contraseña son incorrectos.')
      })  
    } else{
      errorMessage('Campos obligatorios')
    } 
  }

  clearForm(){
    this.loginForm.reset()
  }
}
