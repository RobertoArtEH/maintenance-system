import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { errorMessage, successDialog } from 'src/app/components/resources/alert';
import { CalendarItem } from 'src/app/interfaces/calendar/calendar-item';
import { Responsible } from 'src/app/interfaces/responsible/responsible';
import { User } from 'src/app/interfaces/user/user';
import { CalendarService } from 'src/app/services/calendar/calendar.service';

@Component({
  selector: 'app-calendar-dialog',
  templateUrl: './calendar-dialog.component.html',
  styleUrls: ['./calendar-dialog.component.css']
})
export class CalendarDialogComponent implements OnInit {
  calendarForm: FormGroup;
  users: User[] = []
  user: User
  calendarItem: CalendarItem
  items: CalendarItem[] = []
  item: CalendarItem
  displayedColumns= ['index', 'responsible','date' ,'delete'];
  dataSource: MatTableDataSource<any>;
  pipe = new DatePipe('en-US');
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private dialogRef: MatDialogRef<CalendarDialogComponent>, private calendarService: CalendarService,
    @Inject(MAT_DIALOG_DATA) public data: any,) {dialogRef.disableClose = true; this.buildForm(); }

  ngOnInit() {
    this.buildForm()
    this.loadUsers()
  }

  buildForm(): void {
    this.calendarForm = new FormGroup({
      responsibleId: new FormControl('',Validators.required),
      scheduledDate: new FormControl('',Validators.required),
    });
  }

  loadUsers() {  
    this.calendarService.getUsers()  
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

  loadUserById(id, item){
    this.calendarService.getUsers()  
        .subscribe(  
            x => {  
              
        for (let i = 0; i < x.data.length; i++) {
          if (x.data[i].id == id){
            this.user = x.data[i]
            item.responsible = this.user
            item.scheduledDate = this.pipe.transform(item.scheduledDate, 'yyyy-MM-dd');
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
    console.log(items)
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
      this.calendarService.save({items: this.items}).subscribe( res => {
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

