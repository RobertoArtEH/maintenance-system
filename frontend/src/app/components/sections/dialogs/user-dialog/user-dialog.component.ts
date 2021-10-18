import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Area } from 'src/app/interfaces/area/area';
import { AreasService } from 'src/app/services/areas/areas.service';
import { RolesService } from '../../../../services/roles/roles.service';
import { Role } from '../../../../interfaces/role/role';
import { User } from 'src/app/interfaces/user/user';
import { UserService } from 'src/app/services/users/user.service';
import { errorMessage, successDialog } from 'src/app/components/resources/alert';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Shift } from 'src/app/interfaces/shift/shift';
import { UserStatus } from 'src/app/interfaces/user/user-status';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent implements OnInit {
  usuario: User
  usuarios: User[] = []
  areas: Area[] = []
  roles: Role[] = []
  shifts: Shift[] = [];
  userForm: FormGroup;
  userStatus: UserStatus[] = []
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  constructor(private dialogRef: MatDialogRef<UserDialogComponent>, private areasService: AreasService, private rolesService: RolesService, private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any,) {dialogRef.disableClose = true; this.buildForm(); }

  ngOnInit() {
    this.buildForm();
    this.loadAreas();
    this.loadRoles();
    this.loadShifts();
    this.loadStatus();

    if (this.data.action) {
      this.show();
    }

  }

  loadStatus(){
    this.userStatus.push({value: 0, name: "Inactivo"},{value: 1, name: 'Activo'})
  }


  buildForm(): void {
    this.userForm = new FormGroup({
      id: new FormControl(null),
      name: new FormControl('',Validators.required),
      lastName: new FormControl('',Validators.required),
      email: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required),
      roleId: new FormControl('',Validators.required),
      careerId: new FormControl('',Validators.required),
      shiftId: new FormControl('',Validators.required),
      is_active: new FormControl('',Validators.required)
    });
  }
  
  show(){
    this.userService.show(this.data.userId).subscribe( res => {
          this.userForm.get('id').setValue(res.data.id)
          this.userForm.get('name').setValue(res.data.name)
          this.userForm.get('lastName').setValue(res.data.last_name)
          this.userForm.get('email').setValue(res.data.email)
          this.userForm.get('password').setValue(res.data.password);
          this.userForm.get('roleId').setValue(res.data.role_id)
          this.userForm.get('careerId').setValue(res.data.career_id)
          this.userForm.get('shiftId').setValue(res.data.shift_id)
          this.userForm.get('is_active').setValue(res.data.is_active)
          // this.loadUser(this.usuarios);
    })
  }

  loadAreas() {
    this.areasService.index()  
        .subscribe(  
            x => {  
      this.areas = x;
      console.log(x);
    },  
    error => {  
      console.log('Error' + error);  
    });  
  }

  loadRoles() {
    this.rolesService.index()  
        .subscribe(  
            x => {  
      this.roles = x
      console.log(x);
    },  
    error => {  
      console.log('Error' + error);  
    });  
  }

  loadShifts() {
    this.shifts.push(
    {
      id: 1,
      name: 'Matutino'
    },
    {
      id: 2,
      name: 'Vespertino'
    }
    );
  }


  createUser() {
    if (this.userForm.valid) {
      this.userService.saveUser(this.userForm.value).subscribe( res => {
        if (res.status) {
          successDialog("Registro exitoso!").then(() => {
            this.clear();
            this.close();
          });
        }
      }, error =>{
        errorMessage(error.message)
      })
    } else {
      errorMessage("Campos obligatorios.")
    }
  }


  updateUser() {
    if (this.userForm.valid) {
      this.userService.saveUser(this.userForm.value).subscribe( res => {
        if (res.status) {
          successDialog("Se actualizo con exito!").then(() => {
            this.clear();
            this.close();
          });
        }
      }, error =>{
        errorMessage(error.message)
      })
    } else {
      errorMessage("Campos obligatorios.")
    }
  }

clear(){
  this.userForm.reset()
}

close() {
  this.dialogRef.close();
}

}
