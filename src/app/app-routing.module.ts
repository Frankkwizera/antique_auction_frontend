import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllItemsComponent } from 'src/app/all-items/all-items.component';
import { SingleItemComponent } from 'src/app/single-item/single-item.component';
import { LoginComponent } from 'src/app/login/login.component';

const routes: Routes = [
  {path: 'items', component: AllItemsComponent},
  {path: 'item/:item_uuid', component: SingleItemComponent},
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
