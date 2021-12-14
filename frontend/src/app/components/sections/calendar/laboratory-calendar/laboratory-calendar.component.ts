import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CalendarTable } from 'src/app/interfaces/calendar/calendar-table';
import { Privileges } from 'src/app/interfaces/privileges/privileges';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { CalendarService } from 'src/app/services/calendar/calendar.service';
import { LaboratoryService } from 'src/app/services/laboratory/laboratory.service';
import { CalendarDialogComponent } from '../../dialogs/calendar-dialog/calendar-dialog.component';
import { LaboratoryCalendarDialogComponent } from '../../dialogs/laboratory-calendar-dialog/laboratory-calendar-dialog.component';

@Component({
  selector: 'app-laboratory-calendar',
  templateUrl: './laboratory-calendar.component.html',
  styleUrls: ['./laboratory-calendar.component.css']
})
export class LaboratoryCalendarComponent implements OnInit {
  privileges: Privileges = {see: null,
    create: null,
    cancel: null,
    edit: null,
    authorize: null,
    reject: null,
    finish: null}
  user: any
  calendar: CalendarTable = {responsible: null, scheduledDate: null, laboratory: null}
  calendars: CalendarTable[] = []
  displayedColumns= ['userRequest','laboratory','scheduled_date'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private dialogRef: MatDialog, private laboratoryService: LaboratoryService, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.loadCalendars()
    this.getData()
  }

  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(action: boolean, id?){   
    const dialogRef = this.dialogRef.open(LaboratoryCalendarDialogComponent,{
      width: '640px',
      data: {id, action},
    })

    dialogRef.afterClosed().subscribe(result => {
      this.loadCalendars()
    });
  }

  loadCalendars() {  
    this.laboratoryService.index()
        .subscribe(  
            x => {  
              console.log(x.data, x)

              for (let index = 0; index < x.data.length; index++) {
                const element = x.data[index];
                
                 x.data[index].items.forEach(res => {
                  
                    this.calendar.responsible = res.responsible
                    this.calendar.scheduledDate = res.laboratory_date
                    this.calendar.laboratory = res.laboratory
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

  getData(){
    this.user = JSON.parse(this.authService.getData())
    
    this.privileges.see = !!this.user.pageFaculties.find(i => i.page.name === 'Calendario' && i.faculty.name === 'ver')
    this.privileges.create = !!this.user.pageFaculties.find(i => i.page.name === 'Calendario' && i.faculty.name === 'crear')
    this.privileges.edit = !!this.user.pageFaculties.find(i => i.page.name === 'Calendario' && i.faculty.name === 'editar')
    this.privileges.cancel = !!this.user.pageFaculties.find(i => i.page.name === 'Calendario' && i.faculty.name === 'cancelar')
    this.privileges.authorize = !!this.user.pageFaculties.find(i => i.page.name === 'Calendario' && i.faculty.name === 'autorizar')
    this.privileges.reject = !!this.user.pageFaculties.find(i => i.page.name === 'Calendario' && i.faculty.name === 'rechazar')
    this.privileges.finish = !!this.user.pageFaculties.find(i => i.page.name === 'Calendario' && i.faculty.name === 'finalizar')
    console.log(this.privileges)
  }
}
