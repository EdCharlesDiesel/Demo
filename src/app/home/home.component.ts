import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  homeForm :FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.homeForm = this.formBuilder.group({
      willNumber: ['', [Validators.required, Validators.minLength(3)]],
      
    });
  }


  search(){
    
  }
}
