import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Will } from './will';
import { WillService } from './will.service';

@Component({
  selector: 'app-will-detail',
  templateUrl: './will-detail.component.html',
  styleUrls: ['./will-detail.component.css']
})
export class WillDetailComponent {

pageTitle = 'Will Detail';
errorMessage = '';
will: Will | undefined;

constructor(private route: ActivatedRoute,
            private router: Router,
            private willService: WillService) {
}

ngOnInit() {
  const param = this.route.snapshot.paramMap.get('id');
  if (param) {
    const id = +param;
    this.getWill(id);
  }
}

getWill(id: number) {
  this.willService.getWill(id).subscribe({
    next: will => this.will = will,
    error: err => this.errorMessage = err
  });
}

onBack(): void {
  this.router.navigate(['/wills']);
}

}