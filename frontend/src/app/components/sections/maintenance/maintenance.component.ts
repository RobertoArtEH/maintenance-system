import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { confirmDialog, errorMessage, successDialog } from 'src/app/components/resources/alert';
import { MaintenanceService } from 'src/app/services/maintenance/maintenance.service';
import { MaintenanceDialogComponent } from '../dialogs/maintenance-dialog/maintenance-dialog.component';


@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css']
})

export class MaintenanceComponent implements OnInit {
  displayedColumns= ['serviceType','userRequest','serviceDate','status', 'accept', 'cancel', 'edit'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private dialogRef: MatDialog, private maintenanceService: MaintenanceService) { }

  ngOnInit() {
    this.loadMaintenances();
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
    confirmDialog('¿Estás seguro que deseas cancelar esta solicitud?', 'Cancelar', 'Aceptar').then((result) => {
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
}
