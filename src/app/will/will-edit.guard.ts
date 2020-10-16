import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { WillEditComponent } from './will-edit.component';



@Injectable({
    providedIn: 'root'
  })
  export class WillEditGuard implements CanDeactivate<WillEditComponent> {
    canDeactivate(component: WillEditComponent): Observable<boolean> | Promise<boolean> | boolean {
      if (component.ngOnInit.call) {
         const willNumber = component.willForm.get('willNumber').value || 'New Will';
        return confirm(`Navigate away and lose all changes to ${willNumber}?`);
        
      }
      return true;
    }
  }
  