import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Will } from './will';
import { WillService } from './will.service';

@Component({
  selector: 'app-will-list',
  templateUrl: './will-list.component.html',
  styleUrls: ['./will-list.component.scss']
})
export class WillListComponent implements OnInit {
  pageTitle = 'Search Will';  
  errorMessage = '';

  _willListFilter = '';
  get willListFilter(): string {
    return this._willListFilter;
  }
  set willListFilter(value: string) {
    this._willListFilter = value;
   this.filteredWills = this.willListFilter ? 
   this.performFilter(this.willListFilter) : this.wills;
  }

  filteredWills: Will[] = [];
  wills: Will[] = [];

  constructor(private willService: WillService) { }

  performFilter(filterBy: string): Will[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.wills.filter((will: Will) =>
      will.surname.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  

  ngOnInit(): void {
    this.willService.getWills().subscribe({
      next: wills => {
        this.wills = wills;
        this.filteredWills = this.wills;
      },
      error: err => this.errorMessage = err
    });
  }
  // WillListForm: FormGroup;
  // will = new Will();

  // get willDetail(): FormArray {
  //   return this.WillListForm.get('client') as FormArray;
  // }

  // constructor(private formbuilder: FormBuilder) { }

  // ngOnInit() {
  //   this.WillListForm = this.formbuilder.group({
  //     willNumber: ['', Validators.required, Validators.minLength(3)],
  //     clientCode: ['', Validators.minLength(3)],
  //     isEpp: false,
  //     createdDate: ['', Validators.required],
  //     editedBy: ['', Validators.required],
  //     editedDate: ['', Validators.required],
  //     client: this.formbuilder.array([this.client()])
  //   });
  // }


  // addWill(): void {
  //   this.willDetail.push(this.client());
  // }

  // client(): FormGroup {
  //   return this.formbuilder.group({
  //     firstName: '',
  //     cifCode: '',
  //     gender: '',
  //     EstimatedSizeofEstate: ''
  //   });
  // }
}


