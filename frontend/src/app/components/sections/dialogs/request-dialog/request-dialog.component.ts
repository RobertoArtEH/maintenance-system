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
import { ServiceRequest } from 'src/app/interfaces/services/service-request';
import { ServiceRequestItem } from 'src/app/interfaces/services/service-request-item';
import { User } from 'src/app/interfaces/user/user';
import { AreasService } from 'src/app/services/areas/areas.service';
import { ServiceRequestService } from 'src/app/services/serviceRequest/service-request.service';
import { RequestItemComponent } from '../request-item/request-item.component';

@Component({
  selector: 'app-request-dialog',
  templateUrl: './request-dialog.component.html',
  styleUrls: ['./request-dialog.component.css']
})
export class RequestDialogComponent implements OnInit {
  requestForm: FormGroup;
  areas: Area[] = []
  users: User[] = []
  items: ServiceRequestItem[] = []
  request: ServiceRequest
  displayedColumns= ['index', 'item_name','description','general_ubication', 'specific_ubication', 'service_details', 'edit', 'delete'];
  dataSource: MatTableDataSource<any>;
  pipe = new DatePipe('en-US');
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private areasService: AreasService, private dialogReff: MatDialog,
    private serviceRequest: ServiceRequestService, private router: Router, private dialogRef: MatDialogRef<RequestDialogComponent>,
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
      folio: new FormControl('',Validators.required),
      area_id: new FormControl('',Validators.required),
      serviceDate: new FormControl('',Validators.required),
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
    this.serviceRequest.show(this.data.id).subscribe( res => {
          this.requestForm.get('id').setValue(res.data.id)
          this.requestForm.get('folio').setValue(res.data.folio)
          this.requestForm.get('area_id').setValue(res.data.area_id)
          this.requestForm.get('serviceDate').setValue(res.data.serviceDate)
          this.requestForm.get('responsible_id').setValue(res.data.responsible_id)
          this.items = res.data.items

          this.loadItem(this.items)
    })
  }

  update(){
    if (this.requestForm.valid) {
      this.request = this.requestForm.value
      this.request.items = this.items
      this.request.comments = ""
      this.request.serviceDate  = this.pipe.transform(this.request.serviceDate, 'yyyy-MM-dd 00:00:00');
      this.request.service_status_id = 1

      this.serviceRequest.save(this.request).subscribe( res => {
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
    this.serviceRequest.getUsers()  
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
      this.request.comments = ""
      this.request.serviceDate  = this.pipe.transform(this.request.serviceDate, 'yyyy-MM-dd 00:00:00');
      this.request.service_status_id = 1
      this.request.id = null

      this.serviceRequest.save(this.request).subscribe( res => {
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
    const dialogRef = this.dialogReff.open(RequestItemComponent,{
      width: '640px',
      data: {data, action, i},
    })

    dialogRef.afterClosed().subscribe(result => {
      if (!result.action){
        this.items.push(result.item)
        this.items[result.index] = result.item
        this.items[result.index].id = null
        this.items[result.index].item_status_id = 1
      } else{
        this.items[result.index] = result.item
        this.items[result.index].id = null
        this.items[result.index].item_status_id = 1
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

