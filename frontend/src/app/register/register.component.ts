import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
  }]
})
export class RegisterComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  states: string[] = ['Kerala', 'Maharashtra', 'Goa'];
  cities: string[] = ['Pune', 'Mumbai', 'Goa'];
  city: FormGroup;
  street: FormGroup;
  mobileno: FormGroup;
  aadhar: FormGroup;
  pincode: FormGroup;
  garagename: FormGroup;
  @ViewChild('fileInput2') fileInput2;
  @ViewChild('fileInput') fileInput;

  file: File | null = null;
  file2: File | null = null;
  img1
  img2
  imagePath
  imagePath2


  onChangeFileInput() {
    const files: { [key: string]: File } = this.fileInput.nativeElement.files;
    this.file = files[0];
    console.log('image', this.file)
    let reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = () => {
      console.log('result', reader.result);
      this.imagePath = reader.result
    };

    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  onChangeFileInput2() {
    const files2: { [key: string]: File } = this.fileInput2.nativeElement.files;
    this.file2 = files2[0];
    console.log('image')
    let reader2 = new FileReader();
    reader2.readAsDataURL(this.file2);
    reader2.onload = () => {
      console.log(reader2.result);
      this.imagePath2 = reader2.result
    };
    reader2.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  constructor(private _formBuilder: FormBuilder, private sanitizer: DomSanitizer) { }


  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      mobileno: ['', Validators.required],
      aadhar: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      garagename: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required],
      pincode: ['', Validators.required],
    });


  }
  submit() {
    console.log(this.firstFormGroup.value)
    console.log(this.secondFormGroup.value)
    console.log("submi")
  }
}
