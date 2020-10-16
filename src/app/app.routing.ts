
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './user/login.component';
import { Error404Component } from './error404/error404.component';
import { HomeComponent } from './home/home.component';



const routes: Routes = [


  { path: '', redirectTo: '/home', pathMatch: 'full' },  
  { path: 'home', component: HomeComponent },
  
   
  // { path: 'will-detail/:willId', component: WillDetailComponent },
  // { path: 'will-update/:willId', component: WillUpdateComponent },  
  // { path: 'will-add', component: WillAddComponent },  
  // { path: 'will/:willId/epp-add', component: EppAddComponent },
  // { path: 'epp', component: EppComponent },
  // { path: 'about', component: AboutComponent }
  { path: 'login', component: LoginComponent },
  { path: '404', component: Error404Component },
];

// define a module
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
