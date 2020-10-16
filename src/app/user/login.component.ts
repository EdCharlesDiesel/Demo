import { Component, OnInit } from '@angular/core'
import { AuthService } from './auth.service'
import { Router } from '@angular/router'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styles: [`
    em { float:right; color:#E05C65; padding-left:10px; }
  `]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup; 

  constructor(private formBuilder:FormBuilder) {

  }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(
      {
        userName: ['',[Validators.required,Validators.minLength(3)]],
        passWord: ['',[Validators.required,Validators.minLength(3)]]        
      }
    );
  }

  login() {
    console.log(this.loginForm);
    console.log('logged in', +JSON.stringify(this.loginForm))
  }  
}