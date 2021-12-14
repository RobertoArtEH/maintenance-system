import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { errorMessage, successDialog } from 'src/app/components/resources/alert';
import { CalendarItem } from 'src/app/interfaces/calendar/calendar-item';
import { Laboratory } from 'src/app/interfaces/Laboratories/laboratory';
import { LaboratoryCalendarItem } from 'src/app/interfaces/Laboratories/laboratory-calendar-item';
import { User } from 'src/app/interfaces/user/user';
import { CalendarService } from 'src/app/services/calendar/calendar.service';
import { LaboratoryService } from 'src/app/services/laboratory/laboratory.service';
import { CalendarDialogComponent } from '../calendar-dialog/calendar-dialog.component';

@Component({
  selector: 'app-laboratory-calendar-dialog',
  templateUrl: './laboratory-calendar-dialog.component.html',
  styleUrls: ['./laboratory-calendar-dialog.component.css']
})
export class LaboratoryCalendarDialogComponent implements OnInit {
  calendarForm: FormGroup;
  users: User[] = []
  user: User
  laboratories: Laboratory[] = []
  laboratory: Laboratory
  calendarItem: LaboratoryCalendarItem
  items: LaboratoryCalendarItem[] = []
  item: LaboratoryCalendarItem
  displayedColumns= ['index', 'responsible', 'date' ,'delete'];
  dataSource: MatTableDataSource<any>;
  pipe = new DatePipe('en-US');
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private dialogRef: MatDialogRef<LaboratoryCalendarDialogComponent>, private laboratoryService: LaboratoryService,
    @Inject(MAT_DIALOG_DATA) public data: any,) {dialogRef.disableClose = true; this.buildForm(); }

  ngOnInit() {
    this.buildForm()
    this.loadUsers()
    this.loadLaboratories()
  }

  buildForm(): void {
    this.calendarForm = new FormGroup({
      responsibleId: new FormControl('',Validators.required),
      laboratoryDate: new FormControl('',Validators.required),
      laboratoryId: new FormControl('',Validators.required),
    });
  }

  loadUsers() {  
    this.laboratoryService.getUsers()  
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

  loadLaboratories() {  
    this.laboratoryService.getLabs()  
        .subscribe(  
            x => {  
              console.log(x)
        this.laboratories = x
    },  
    error => {  
      console.log('Error' + error);  
    });  
  }

  loadUserById(id, item){
    this.laboratoryService.getUsers()  
        .subscribe(  
            x => {  
              
        for (let i = 0; i < x.data.length; i++) {
          if (x.data[i].id == id){
            this.user = x.data[i]
            item.responsible = this.user
            item.laboratoryDate = this.pipe.transform(item.laboratoryDate, 'yyyy-MM-dd');
            this.items.push(item)
            console.log(this.items)
            this.loadItem(this.items)
          }
        }
    },  
    error => {  
      console.log('Error' + error);  
    });  
  }
  
  deleteItem(item, index){
    
    for(var i = this.items.length - 1; i >= 0; i--) {
      if(this.items[index] === item) {
        this.items.splice(index, 1);
      }
    }
    this.loadItem(this.items)
  }

  loadItem(items) {  
    this.dataSource = new MatTableDataSource();  
    this.dataSource.data = items;  
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  add(){
    if (this.calendarForm.valid){
      this.item = this.calendarForm.value
      this.loadUserById(this.item.responsibleId, this.item)
    }
  }


  save(){
    if (this.calendarForm.valid){
      this.laboratoryService.save({items: this.items}).subscribe( res => {
        if (res.status){
          successDialog(res.message).then(() => {
            this.close()
          })
        }
      })
    } else {
      errorMessage("Campos obligatorios.")
    }
  }

  close() {
    this.dialogRef.close();
  }
  clear(){
    this.calendarForm.reset()
  }
}
