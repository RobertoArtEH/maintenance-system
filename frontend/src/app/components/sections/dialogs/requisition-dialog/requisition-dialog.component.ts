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
import { Requisition } from 'src/app/interfaces/requisition/requisition';
import { RequisitionItem } from 'src/app/interfaces/requisition/requisition-item';
import { ServiceRequest } from 'src/app/interfaces/services/service-request';
import { ServiceRequestItem } from 'src/app/interfaces/services/service-request-item';
import { User } from 'src/app/interfaces/user/user';
import { AreasService } from 'src/app/services/areas/areas.service';
import { RequisitionService } from 'src/app/services/requisition/requisition.service';
import { ServiceRequestService } from 'src/app/services/serviceRequest/service-request.service';
import { RequestItemComponent } from '../request-item/request-item.component';
import { RequisitionItemComponent } from '../requisition-item/requisition-item.component';

@Component({
  selector: 'app-requisition-dialog',
  templateUrl: './requisition-dialog.component.html',
  styleUrls: ['./requisition-dialog.component.css']
})
export class RequisitionDialogComponent implements OnInit {
  requestForm: FormGroup;
  areas: Area[] = []
  users: User[] = []
  items: RequisitionItem[] = []
  request: Requisition
  displayedColumns= ['index', 'code','quantity','unit', 'unit_price', 'description','total_price', 'edit', 'delete'];
  dataSource: MatTableDataSource<any>;
  pipe = new DatePipe('en-US');
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private areasService: AreasService, private dialogReff: MatDialog,
    private requisitionService: RequisitionService, private router: Router, private dialogRef: MatDialogRef<RequisitionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) {dialogRef.disableClose = true; this.buildForm(); }

  ngOnInit(): void {
    this.buildForm()
    this.loadAreas()
    this.loadUsers()
  
    if (this.data.id != null) {
      this.show()
    }
  }

  buildForm(): void {
    this.requestForm = new FormGroup({
      id: new FormControl(''),
      dependency: new FormControl('',Validators.required),
      elaboration_date: new FormControl('',Validators.required),
      check_in_date: new FormControl('',Validators.required),
      justification:  new FormControl('',Validators.required),
      contact:  new FormControl('',Validators.required),
      responsible_id:  new FormControl('',Validators.required),
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

  show(){
    this.requisitionService.show(this.data.id).subscribe( res => {
          this.requestForm.get('id').setValue(res.data.id)
          this.requestForm.get('dependency').setValue(res.data.dependency)
          this.requestForm.get('elaboration_date').setValue(res.data.elaboration_date)
          this.requestForm.get('check_in_date').setValue(res.data.check_in_date)
          this.requestForm.get('justification').setValue(res.data.justification)
          this.requestForm.get('contact').setValue(res.data.contact)
          this.requestForm.get('responsible_id').setValue(res.data.responsible_id)
          this.items = res.data.items

          this.loadItem(this.items)
    })
  }

  update(){
    if (this.requestForm.valid) {
      this.request = this.requestForm.value
      this.request.items = this.items
      this.request.elaboration_date  = this.pipe.transform(this.request.elaboration_date, 'yyyy-MM-dd 00:00:00');
      this.request.check_in_date  = this.pipe.transform(this.request.check_in_date, 'yyyy-MM-dd 00:00:00');
      this.request.requisitionStatusId = 1
      this.request.authorized_user_id = 1

      this.requisitionService.save(this.request).subscribe( res => {
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
    this.requisitionService.getUsers()  
        .subscribe(  
            x => {  
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

  sendRequest(){
    this.requestForm.get('id').setValue(1)

    if (this.requestForm.valid) {
      this.request = this.requestForm.value
      this.request.items = this.items
      this.request.elaboration_date  = this.pipe.transform(this.request.elaboration_date, 'yyyy-MM-dd 00:00:00');
      this.request.check_in_date  = this.pipe.transform(this.request.check_in_date, 'yyyy-MM-dd 00:00:00');
      this.request.requisitionStatusId = 1
      this.request.authorized_user_id = 1
      this.request.id = null

      this.requisitionService.save(this.request).subscribe( res => {
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
    const dialogRef = this.dialogReff.open(RequisitionItemComponent,{
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
    this.requestForm.reset()
  }

  close() {
    this.dialogRef.close();
  }
}

