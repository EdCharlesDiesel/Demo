import { WillService } from './will.service';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChildren } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl, FormControlName } from '@angular/forms';
import { fromEvent, merge, Observable, Subscription } from 'rxjs';
import { Will } from './will';
import { ActivatedRoute, Router } from '@angular/router';
import { NumberValidators } from '../shared/number.validator';
import { debounceTime } from 'rxjs/operators';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-will-edit',
  templateUrl: './will-edit.component.html',
  styleUrls: ['./will-edit.component.css']
})
export class WillEditComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  pageTitle = 'Will Edit';
  errorMessage: string;
  willForm: FormGroup;

  firstParticipantFirstName: FormControl;
  firstParticipantSurname: FormControl;
  firstParticipantSmokingStatus: FormControl;
  SecondParticipantFirstName: FormControl;
  SecondParticipantSurname: FormControl;
  SecondParticipantSmokingStatus: FormControl;

  firstEpp: FormControl;
  secondEpp: FormControl;

  will: Will;
  private sub: Subscription;


  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  // private validationMessages: { [key: string]: { [key: string]: string } };
  // private genericValidator: GenericValidator;

  get participants(): FormArray {
    return this.willForm.get('participants') as FormArray;
  }
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private willService: WillService) { }

  ngOnInit() {

    this.willForm = this.formBuilder.group({

      willNumber: ['', Validators.required],
      birthDate: new Date(Date.now()),
      clientCode: ['', Validators.required],
      initials: ['', Validators.required],
      surname: ['', Validators.required],
      gender: ['', Validators.required],
      idNumber: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      postlAddrLine1: ['', Validators.required],
      postlSuburb: ['', Validators.required],
      noOfJointPartcpnt: ['', Validators.required],
      firstParticipants: this.formBuilder.array([this.buildFirstParticipants()]),
      // secondParticipants: this.formBuilder.array([this.buildSecondParticipants()]),
      firstEpp: true,
      secondEpp: true

    });

    // Read the will Id from the route parameter
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        this.getWill(id);
      }
    );
  }


  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    // This is required because the valueChanges does not provide notification on blur
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    // so we only need to subscribe once.
    merge(this.willForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      // this.displayMessage = this.genericValidator.processMessages(this.willForm);
    });
  }
  // addParticipants(): void {
  //   this.participants.push(new FormControl());
  // }

    addParticipants(): void {
    this.participants.push(this.buildFirstParticipants());
  }

  deleteParticipants(index: number): void {
    this.participants.removeAt(index);
    this.participants.markAsDirty();
  }

  getWill(id: number): void {

    this.willService.getWill(id)
      .subscribe({
        next: (will: Will) => this.displayWill(will),
        error: err => this.errorMessage = err
      });
  }


  displayWill(will: Will): void {
    if (this.willForm) {
      this.willForm.reset();
    }
    this.will = will;

    if (this.will.id === 0) {
      this.pageTitle = 'Add Will';
    } else {
      this.pageTitle = `Edit will: ${this.will.willNumber}`;
    }

    // Update the data on the form
    this.willForm.patchValue({

      willNumber: this.will.willNumber,
      birthDate: this.will.birthDate,
      clientCode: this.will.clientCode,
      initials: this.will.initials,
      surname: this.will.surname,
      gender: this.will.gender,
      idNumber: this.will.idNumber,
      maritalStatus: this.will.maritalStatus,
      postlAddrLine1: this.will.postlAddrLine1,
      postlSuburb: this.will.postlSuburb,
      noOfJointPartcpnt: this.will.noOfJointPartcpnt,
      firstParticipants: this.formBuilder.array([this.buildFirstParticipants()]),
      SecondParticipants: this.formBuilder.array([this.buildSecondParticipants()]),
      firstEpp: true,
      secondEpp: true
    });
    this.willForm.setControl('firstParticipants', this.formBuilder.array(this.will.firstParticipants || []));
  }

  deleteWill(): void {
    if (this.will.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    }

    else {
      if (confirm(`Really delete the will: ${this.will.willNumber}?`)) {
        this.willService.deleteWill(this.will.id)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
      }
    }
  }

  saveWill(): void {
    if (this.willForm.valid) {
      if (this.willForm.dirty) {
        const p = { ...this.will, ...this.willForm.value };

        if (p.id === 0) {
          this.willService.createWill(p)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        } else {
          this.willService.updateWill(p)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        }
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }
  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.willForm.reset();
    this.router.navigate(['/wills']);
  }

  buildFirstParticipants(): FormGroup {
    return this.formBuilder.group({
      firstParticipantTitle:[''],
      firstParticipantFirstName: [''],
      firstParticipantSurname: [''],
      firstParticipantSmokingStatus: [''],
      firstParticipantEmailAddress:[''],
      firstParticipantRefereeredBy:[''],
      firstParticipantRefereeredEmail:[''],
      firstParticipantImmediateCashPayment:['', Validators.required,Validators.maxLength(50000)],
      firstParticipantGender:[''],
      firstParticipantDateofBirth:['']
    });
  }

  buildSecondParticipants(): FormGroup {
    return this.formBuilder.group({
      secondParticipantTitle:[''],
      SecondParticipantFirstName: [''],
      SecondParticipantSurname: [''],
      SecondParticipantSmokingStatus: [''],
      secondParticipantEmailAddress:[''],
      secondParticipantRefereeredBy:[''],
      secondParticipantRefereeredEmail:[''],
      secondParticipantImmediateCashPayment:['', Validators.required,Validators.maxLength(50000)],
      secondParticipantGender:[''],
      secondParticipantDateofBirth:['']
    });
  }  
}


