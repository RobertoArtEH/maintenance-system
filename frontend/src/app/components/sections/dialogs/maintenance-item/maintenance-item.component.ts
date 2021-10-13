import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaintenanceItem } from 'src/app/interfaces/maintenance/maintenance-item';

@Component({
  selector: 'app-maintenance-item',
  templateUrl: './maintenance-item.component.html',
  styleUrls: ['./maintenance-item.component.css']
})
export class MaintenanceItemComponent implements OnInit {
  itemForm: FormGroup;
  item: MaintenanceItem
  constructor(private dialogRef: MatDialogRef<MaintenanceItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) {dialogRef.disableClose = true; this.buildForm(); }

  ngOnInit() {
    this.buildForm()
    if (this.data.action) {
        this.getData()
    }
  }

  buildForm(): void {
    this.itemForm = new FormGroup({
      id: new FormControl(''),
      quantity: new FormControl('',Validators.required),
      description: new FormControl('',Validators.required),
      suggetions: new FormControl('',Validators.required),
    });
  }

  add(){
    if (this.itemForm.valid){
      this.item = this.itemForm.value
      this.close({item: this.item, action: false, index: this.data.i})
    }
  }

  update(){
    if (this.itemForm.valid) {
      this.item = this.itemForm.value
      this.close({item: this.item, action: true, index: this.data.i})
    }
  }

  getData(){
    const item = this.data.data
    console.log("item", this.data.item)
    this.itemForm.get('id').setValue(this.data.id)
    this.itemForm.get('quantity').setValue(item.quantity)
    this.itemForm.get('description').setValue(item.description)
    this.itemForm.get('suggetions').setValue(item.suggetions)
  }
  
  close(item?) {
    this.dialogRef.close(item);
  }

}
