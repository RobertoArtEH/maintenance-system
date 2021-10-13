import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CalendarTable } from 'src/app/interfaces/calendar/calendar-table';
import { CalendarService } from 'src/app/services/calendar/calendar.service';
import { CalendarDialogComponent } from '../dialogs/calendar-dialog/calendar-dialog.component';
import { RequestDialogComponent } from '../dialogs/request-dialog/request-dialog.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  calendar: CalendarTable = {responsible: null, scheduledDate: null}
  calendars: CalendarTable[] = []
  displayedColumns= ['userRequest','scheduled_date'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private dialogRef: MatDialog, private calendarService: CalendarService) { }

  ngOnInit(): void {
    this.loadCalendars()
  }

  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(action: boolean, id?){   
    const dialogRef = this.dialogRef.open(CalendarDialogComponent,{
      width: '640px',
      data: {id, action},
    })

    dialogRef.afterClosed().subscribe(result => {
      this.loadCalendars()
    });
  }

  loadCalendars() {  
    this.calendarService.index()
        .subscribe(  
            x => {  
              console.log(x.data)

              for (let index = 0; index < x.data.length; index++) {
                const element = x.data[index];
                
                 x.data[index].items.forEach(res => {
                  
                    this.calendar.responsible = res.responsible
                    this.calendar.scheduledDate = res.scheduled_date
                    this.calendars.push(this.calendar)
                 });

                 
                 console.log(this.calendars)
              }
    

      this.dataSource = new MatTableDataSource();  
      this.dataSource.data = this.calendars;  
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    },  
    error => {  
      console.log('Error' + error);  
    });  
  }

}
