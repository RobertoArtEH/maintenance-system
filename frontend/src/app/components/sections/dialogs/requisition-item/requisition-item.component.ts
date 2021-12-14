import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RequisitionItem } from 'src/app/interfaces/requisition/requisition-item';
import { ServiceRequestItem } from 'src/app/interfaces/services/service-request-item';

@Component({
  selector: 'app-requisition-item',
  templateUrl: './requisition-item.component.html',
  styleUrls: ['./requisition-item.component.css']
})
export class RequisitionItemComponent implements OnInit {
  itemForm: FormGroup;
  item: RequisitionItem
  constructor(private dialogRef: MatDialogRef<RequisitionItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) {dialogRef.disableClose = true; this.buildForm(); }

  ngOnInit() {
    this.buildForm()
    console.log(this.data)
    if (this.data.action) {
        this.getData()
    }
  }

  buildForm(): void {
    this.itemForm = new FormGroup({
      id: new FormControl(''),
      code: new FormControl('',Validators.required),
      quantity: new FormControl('',Validators.required),
      unit: new FormControl('',Validators.required),
      unit_price:  new FormControl('',Validators.required),
      description:  new FormControl('',Validators.required),
      total_price:  new FormControl('',Validators.required),
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
    this.itemForm.get('code').setValue(item.code)
    this.itemForm.get('quantity').setValue(item.quantity)
    this.itemForm.get('unit').setValue(item.unit)
    this.itemForm.get('unit_price').setValue(item.unit_price)
    this.itemForm.get('description').setValue(item.description)
    this.itemForm.get('total_price').setValue(item.total_price)
  }
  
  close(item?) {
    this.dialogRef.close(item);
  }
}

