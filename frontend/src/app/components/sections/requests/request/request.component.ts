import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { confirmDialog, errorMessage, successDialog } from 'src/app/components/resources/alert';
import { ServiceRequestService } from 'src/app/services/serviceRequest/service-request.service';
import { RequestDialogComponent } from '../../dialogs/request-dialog/request-dialog.component';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  displayedColumns= ['folio','userRequest','serviceDate','area', 'status', 'accept', 'cancel', 'edit'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private dialogRef: MatDialog, private serviceRequest: ServiceRequestService) { }

  ngOnInit() {
    this.loadRequests();
  }

  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

   openDialog(action: boolean, id?){   
    const dialogRef = this.dialogRef.open(RequestDialogComponent,{
      width: '840px',
      data: {id, action},
    })

    dialogRef.afterClosed().subscribe(result => {
      this.loadRequests()
    });
  }
  
  loadRequests() {  
    this.serviceRequest.index()
        .subscribe(  
            x => {  
              console.log(x.data)
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
        this.serviceRequest.cancel(id).subscribe( res => {
          if (res.status){
            successDialog(res.message).then(() => {
              this.loadRequests()
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

