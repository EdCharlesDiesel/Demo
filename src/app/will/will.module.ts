import { WillData } from './will-data';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { WillDetailComponent } from './will-detail.component';
import { WillEditComponent } from './will-edit.component';
import { WillListComponent } from './will-list.component';
import { WillEditGuard } from './will-edit.guard';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';



@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InMemoryWebApiModule.forRoot(WillData),
    RouterModule.forChild([
      { path: 'wills', component: WillListComponent },
      { path: 'wills/:id', component: WillDetailComponent },
      {
        path: 'wills/:id/edit',
        canDeactivate: [WillEditGuard],
        component: WillEditComponent
      }
    ])
  ],
  declarations: [WillListComponent, WillDetailComponent, WillEditComponent]
})
export class WillModule { }




