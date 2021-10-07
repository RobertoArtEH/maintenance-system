import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  requestForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.buildForm()
  }

  buildForm(): void {
    this.requestForm = new FormGroup({
      career: new FormControl('',Validators.required),
      folio: new FormControl('',Validators.required),
      date: new FormControl('',Validators.required),
      device: new FormControl('',Validators.required),
      description: new FormControl('',Validators.required),
      location_one: new FormControl('',Validators.required),
      location_two: new FormControl('',Validators.required),
      service: new FormControl('',Validators.required),
    });
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

}
