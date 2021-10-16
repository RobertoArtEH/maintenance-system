import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserDialogComponent } from '../../dialogs/user-dialog/user-dialog.component';
import { UserService } from '../../../../services/users/user.service';
import { Area } from 'src/app/interfaces/area/area';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { Privileges } from 'src/app/interfaces/privileges/privileges';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  privileges: Privileges = {see: null,
    create: null,
    cancel: null,
    edit: null,
    authorize: null,
    reject: null,
    finish: null}
  user: any
  userForm: FormGroup;
  areas: Area[] = []
  displayedColumns= ['name','email','career', 'shift', 'role', 'actions', 'edit'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private dialogRef: MatDialog, private userService: UserService,private authService: AuthenticationService) { }

  ngOnInit() {
    this.loadUser();
    this.getData()
  }

  filter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
  
  
  loadUser() {
    this.userService.getallUsers()
    .subscribe(resp => {
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = resp.data;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(resp)
    },
    error=>{
      console.log('Error' + error);
    });
  }
  
  openDialog(action: boolean, userId?){
    const dialogRef = this.dialogRef.open(UserDialogComponent,{
      width: '640px',
      data: {action, userId},
    })

    dialogRef.afterClosed().subscribe(()=>{
      this.loadUser();
    });
  }
  getData(){
    this.user = JSON.parse(this.authService.getData())
    
    this.privileges.see = !!this.user.pageFaculties.find(i => i.page.name === 'Usuarios' && i.faculty.name === 'ver')
    this.privileges.create = !!this.user.pageFaculties.find(i => i.page.name === 'Usuarios' && i.faculty.name === 'crear')
    this.privileges.edit = !!this.user.pageFaculties.find(i => i.page.name === 'Usuarios' && i.faculty.name === 'editar')
    this.privileges.cancel = !!this.user.pageFaculties.find(i => i.page.name === 'Usuarios' && i.faculty.name === 'cancelar')
    this.privileges.authorize = !!this.user.pageFaculties.find(i => i.page.name === 'Usuarios' && i.faculty.name === 'autorizar')
    this.privileges.reject = !!this.user.pageFaculties.find(i => i.page.name === 'Usuarios' && i.faculty.name === 'rechazar')
    this.privileges.finish = !!this.user.pageFaculties.find(i => i.page.name === 'Usuarios' && i.faculty.name === 'finalizar')
  }

}
