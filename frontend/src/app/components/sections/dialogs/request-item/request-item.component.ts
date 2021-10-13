import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceRequestItem } from 'src/app/interfaces/services/service-request-item';

@Component({
  selector: 'app-request-item',
  templateUrl: './request-item.component.html',
  styleUrls: ['./request-item.component.css']
})
export class RequestItemComponent implements OnInit {
  itemForm: FormGroup;
  item: ServiceRequestItem
  constructor(private dialogRef: MatDialogRef<RequestItemComponent>,
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
      item_name: new FormControl('',Validators.required),
      description: new FormControl('',Validators.required),
      general_ubication: new FormControl('',Validators.required),
      specific_ubication: new FormControl('',Validators.required),
      service_details: new FormControl('',Validators.required),
    });
  }

  add(){
    if (this.itemForm.valid){
      this.item = this.itemForm.value
      this.item.item_status_id = 1
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
    this.itemForm.get('item_name').setValue(item.item_name)
    this.itemForm.get('description').setValue(item.description)
    this.itemForm.get('general_ubication').setValue(item.general_ubication)
    this.itemForm.get('specific_ubication').setValue(item.specific_ubication)
    this.itemForm.get('service_details').setValue(item.service_details)
  }
  
  close(item?) {
    this.dialogRef.close(item);
  }
}

