import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { PageComponent } from './page/page.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }, 
  {
    path: 'iletisim',
    component: ContactComponent
  }, 
  {
    path: 'country/:id',
    component: PageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
