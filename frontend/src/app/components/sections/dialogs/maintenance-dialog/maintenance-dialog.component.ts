import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { errorMessage, successDialog } from 'src/app/components/resources/alert';
import { Area } from 'src/app/interfaces/area/area';
import { Maintenance } from 'src/app/interfaces/maintenance/maintenance';
import { MaintenanceItem } from 'src/app/interfaces/maintenance/maintenance-item';
import { ServiceType } from 'src/app/interfaces/maintenance/service-type';
import { ServiceRequest } from 'src/app/interfaces/services/service-request';
import { User } from 'src/app/interfaces/user/user';
import { AreasService } from 'src/app/services/areas/areas.service';
import { MaintenanceService } from 'src/app/services/maintenance/maintenance.service';
import { ServiceRequestService } from 'src/app/services/serviceRequest/service-request.service';
import { MaintenanceItemComponent } from '../maintenance-item/maintenance-item.component';

@Component({
  selector: 'app-maintenance-dialog',
  templateUrl: './maintenance-dialog.component.html',
  styleUrls: ['./maintenance-dialog.component.css']
})
export class MaintenanceDialogComponent implements OnInit {
  maintenanceForm: FormGroup;
  users: User[] = []
  items: MaintenanceItem[] = []
  serviceTypes: ServiceType[] = []
  maintenance: Maintenance
  displayedColumns= ['index', 'quantity','description','suggetions', 'edit', 'delete'];
  dataSource: MatTableDataSource<any>;
  pipe = new DatePipe('en-US');
  requests: ServiceRequest[] = []
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private areasService: AreasService, private dialogReff: MatDialog,
    private maintenanceService: MaintenanceService, private router: Router, private dialogRef: MatDialogRef<MaintenanceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private serviceRequest: ServiceRequestService) {dialogRef.disableClose = true; this.buildForm(); }

  ngOnInit(): void {
    this.buildForm()
    this.loadUsers()
    this.loadServiceType()
    this.loadRequests()
  
    if (this.data.id != null) {
      this.show()
    }
  }
  loadRequests() {  
    this.serviceRequest.index()
        .subscribe(  
            x => {  
          for (let i = 0; i < x.data.length; i++) {
            if (x.data[i].status.name == 'Finalizado'){
              this.requests.push(x.data[i])
            }
          }
    },  
    error => {  
      console.log('Error' + error);  
    });  
  }

  buildForm(): void {
    this.maintenanceForm = new FormGroup({
      id: new FormControl(''),
      service_request_id: new FormControl('',Validators.required),
      serviceDate: new FormControl('',Validators.required),
      responsible_id:  new FormControl('',Validators.required),
      serviceTypeId:  new FormControl('',Validators.required),
    });
  }

  loadServiceType(){
    this.serviceTypes.push({id: 1, name: "Preventivo"}, { id: 2, name: "Correctivo"})
  }

  show(){
    this.maintenanceService.show(this.data.id).subscribe( res => {
          this.maintenanceForm.get('id').setValue(res.data.id)
          this.maintenanceForm.get('serviceTypeId').setValue(res.data.service_type_id)
          this.maintenanceForm.get('serviceDate').setValue(res.data.serviceDate)
          this.maintenanceForm.get('responsible_id').setValue(res.data.responsible_id)
          this.items = res.data.items

          this.loadItem(this.items)
    })
  }

  update(){
    if (this.maintenanceForm.valid) {
      this.maintenance = this.maintenanceForm.value
      this.maintenance.items = this.items
      this.maintenance.serviceDate  = this.pipe.transform(this.maintenance.serviceDate, 'yyyy-MM-dd 00:00:00');

      this.maintenanceService.save(this.maintenance).subscribe( res => {
        if (res.status) {
          successDialog(res.message).then(() => {
            this.clear()
            this.items = []
            this.loadItem(this.items)
            this.close()
          })
        }
      }, error =>{
        errorMessage(error.message)
      })
    } else {
      errorMessage("Campos obligatorios.")
    }
  }

  loadUsers() {  
    this.maintenanceService.getUsers()  
        .subscribe(  
            x => {  
              console.log(x)
        for (let i = 0; i < x.data.length; i++) {
          if (x.data[i].role_id == 3){
            this.users.push(x.data[i])
          }
        }
    },  
    error => {  
      console.log('Error' + error);  
    });  
  }

  sendMaintenance(){
    this.maintenanceForm.get('id').setValue(1)

    if (this.maintenanceForm.valid) {

      this.maintenance = this.maintenanceForm.value
      this.maintenance.maintenanceStatusId = 1
      this.maintenance.items = this.items
      this.maintenance.serviceDate  = this.pipe.transform(this.maintenance.serviceDate, 'yyyy-MM-dd 00:00:00');
      this.maintenance.id = null

      this.maintenanceService.save(this.maintenance).subscribe( res => {
        if (res.status) {
          successDialog("El mantenimiento se guardó con éxito.").then(() => {
            this.clear()
            this.items = []
            this.loadItem(this.items)
            this.close()
          })
        }
      }, error =>{
        errorMessage(error.message)
      })
    } else {
      errorMessage("Campos obligatorios.")
    }
  }

  deleteItem(item, index){
    
    for(var i = this.items.length - 1; i >= 0; i--) {
      if(this.items[index] === item) {
        this.items.splice(index, 1);
      }
    }
    this.loadItem(this.items)
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

  openDialog(action: boolean, data?, i?){   
    const dialogRef = this.dialogReff.open(MaintenanceItemComponent,{
      width: '640px',
      data: {data, action, i},
    })

    dialogRef.afterClosed().subscribe(result => {
      if (!result.action){
        this.items.push(result.item)
        this.items[result.index] = result.item
        this.items[result.index].id = null
      } else{
        this.items[result.index] = result.item
        this.items[result.index].id = null
       
      }
      this.loadItem(this.items)
    });
  }

  loadItem(items) {  
      this.dataSource = new MatTableDataSource();  
      this.dataSource.data = items;  
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
  }

  clear(){
    this.maintenanceForm.reset()
  }

  close() {
    this.dialogRef.close();
  }
}
