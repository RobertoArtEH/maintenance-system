import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserDialogComponent } from '../../dialogs/user-dialog/user-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userForm: FormGroup;
  displayedColumns= ['name','email','career', 'shift', 'role', 'actions'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private dialogRef: MatDialog) { }

  ngOnInit() {
    this.loadUser();
  }

  filter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
  
  
  loadUser() {  
    // this.userService.index()  
    //     .subscribe(  
    //         x => {  
    //   this.dataSource = new MatTableDataSource();  
    //   this.dataSource.data = x;  
    //   this.dataSource.sort = this.sort;
    //   this.dataSource.paginator = this.paginator;

    // },  
    // error => {  
    //   console.log('Error' + error);  
    // });  
  }
  openDialog(action: boolean){   
    const dialogRef = this.dialogRef.open(UserDialogComponent,{
      width: '640px',
      data: {action},
    })

    dialogRef.afterClosed().subscribe(()=>{
      this.loadUser();
    });
  }
}
