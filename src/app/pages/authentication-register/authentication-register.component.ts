import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-authentication-register',
  templateUrl: './authentication-register.component.html',
  styleUrls: ['./authentication-register.component.css']
})
export class AuthenticationRegisterComponent implements OnInit {
  mainForm!: FormGroup;
  personalInfoForm!: FormGroup;
  contactPreferenceCtrl!: FormControl;

constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    
  }
  initMainForm(): void {
    this.mainForm = this.formBuilder.group({
     
    });
  }
  onSubmitForm(): void {

  }

}
