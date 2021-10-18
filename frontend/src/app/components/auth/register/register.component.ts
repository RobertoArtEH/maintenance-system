import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Area } from 'src/app/interfaces/area/area';
import { Role } from 'src/app/interfaces/role/role';
import { AreasService } from 'src/app/services/areas/areas.service';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { RolesService } from 'src/app/services/roles/roles.service';
import { errorMessage, successDialog } from '../../resources/alert';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup
  roles: Role[] = []
  areas: Area[] = []
  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService, 
    private rolesService: RolesService, private areasService: AreasService, private router: Router) { }

  ngOnInit(): void {
    this.buildForm()
    this.loadAreas()
    this.loadRoles()
  }

  buildForm(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      careerId: ['', [Validators.required]],
      roleId: ['', [Validators.required]],
      shiftId: ['', [Validators.required]],
      email: ['',[Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      password: ['', [Validators.required]],
      isActive: [1]
    });
  }

  register(){
    console.log(this.registerForm.value)
    if (this.registerForm.valid){
      this.authenticationService.register(this.registerForm.value).subscribe( res => {
        if (res.status){
          successDialog("¡Te haz registrado con éxito!").then(() =>{
            this.clearForm()
            this.router.navigate(['/login'])
          })
        }
      }, error =>{
        errorMessage("Datos incorrectos.")
      })
    } else {
      errorMessage("Campos obligatorios.")
    }
  }

  clearForm(){
    this.registerForm.reset()
  }

  loadRoles() {  
    this.rolesService.index()  
        .subscribe(  
            x => {  
      this.roles = x
      console.log(x)
    },  
    error => {  
      console.log('Error' + error);  
    });  
  }

  loadAreas() {  
    this.areasService.index()  
        .subscribe(  
            x => {  
      this.areas = x
    },  
    error => {  
      console.log('Error' + error);  
    });  
  }
}
