import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent implements OnInit {
  userForm: FormGroup;
  constructor(private dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) {dialogRef.disableClose = true; this.buildForm(); }

  ngOnInit() {
    this.buildForm()
  }


  buildForm(): void {
    this.userForm = new FormGroup({
      name: new FormControl('',Validators.required),
      last_name: new FormControl('',Validators.required),
      email: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required),
      role: new FormControl('',Validators.required),
      career: new FormControl('',Validators.required),
      shift: new FormControl('',Validators.required),
      phone: new FormControl('',Validators.required),
    });
  }
  close() {
    this.dialogRef.close();
  }
}
