import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { confirmDialog, errorMessage, successDialog } from 'src/app/components/resources/alert';
import { Privileges } from 'src/app/interfaces/privileges/privileges';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { MaintenanceService } from 'src/app/services/maintenance/maintenance.service';
import { MaintenanceDialogComponent } from '../dialogs/maintenance-dialog/maintenance-dialog.component';


@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css']
})

export class MaintenanceComponent implements OnInit {
  privileges: Privileges = {see: null,
    create: null,
    cancel: null,
    edit: null,
    authorize: null,
    reject: null,
    finish: null}
  user: any
  displayedColumns= ['folio','serviceType','userRequest','serviceDate','status', 'accept', 'cancel', 'edit'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private dialogRef: MatDialog, private maintenanceService: MaintenanceService, private authService: AuthenticationService) { }

  ngOnInit() {
    this.loadMaintenances();
    this.getData()
  }

  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

   openDialog(action: boolean, id?){   
    const dialogRef = this.dialogRef.open(MaintenanceDialogComponent,{
      width: '840px',
      data: {id, action},
    })

    dialogRef.afterClosed().subscribe(result => {
      this.loadMaintenances()
    });
  }
  
  loadMaintenances() {  
    this.maintenanceService.index()
        .subscribe(  
            x => {  
      this.dataSource = new MatTableDataSource();  
      this.dataSource.data = x.data;  
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    },  
    error => {  
      console.log('Error' + error);  
    });  
  }

  cancelRequest(id){
    confirmDialog('¿Estás seguro que deseas cancelar este mantenimiento?', 'Cancelar', 'Aceptar').then((result) => {
      if (result.value) {
        this.maintenanceService.cancel(id).subscribe( res => {
          if (res.status){
            successDialog(res.message).then(() => {
              this.loadMaintenances()
            })
          } else{
            errorMessage(res.message)
          }
        }, error => {
          errorMessage(error)
        })
      }
    })
  }

  acceptRequest(id){
    confirmDialog('¿Estás seguro que deseas aceptar este mantenimiento?', 'Cancelar', 'Aceptar').then((result) => {
      if (result.value) {
        this.maintenanceService.accept(id).subscribe( res => {
          if (res.status){
            successDialog(res.message).then(() => {
              this.loadMaintenances()
            })
          } else{
            errorMessage(res.message)
          }
        }, error => {
          errorMessage(error)
        })
      }
    })
  }

  finishRequest(id){
    confirmDialog('¿Estás seguro que deseas finalizar este mantenimiento?', 'Cancelar', 'Aceptar').then((result) => {
      if (result.value) {
        this.maintenanceService.finish(id).subscribe( res => {
          if (res.status){
            successDialog(res.message).then(() => {
              this.loadMaintenances()
            })
          } else{
            errorMessage(res.message)
          }
        }, error => {
          errorMessage(error)
        })
      }
    })
  }

  getData(){
    this.user = JSON.parse(this.authService.getData())
    
    this.privileges.see = !!this.user.pageFaculties.find(i => i.page.name === 'Mantenimiento' && i.faculty.name === 'ver')
    this.privileges.create = !!this.user.pageFaculties.find(i => i.page.name === 'Mantenimiento' && i.faculty.name === 'crear')
    this.privileges.edit = !!this.user.pageFaculties.find(i => i.page.name === 'Mantenimiento' && i.faculty.name === 'editar')
    this.privileges.cancel = !!this.user.pageFaculties.find(i => i.page.name === 'Mantenimiento' && i.faculty.name === 'cancelar')
    this.privileges.authorize = !!this.user.pageFaculties.find(i => i.page.name === 'Mantenimiento' && i.faculty.name === 'autorizar')
    this.privileges.reject = !!this.user.pageFaculties.find(i => i.page.name === 'Mantenimiento' && i.faculty.name === 'rechazar')
    this.privileges.finish = !!this.user.pageFaculties.find(i => i.page.name === 'Mantenimiento' && i.faculty.name === 'finalizar')
    console.log(this.privileges)
  }
}
