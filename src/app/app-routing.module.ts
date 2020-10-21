import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderComponent } from './orders/order/order.component';

const routes: Routes = [
  {path:'',redirectTo:'enrollee',pathMatch:'full'},
  // {path:'orders',component:OrdersComponent},
  {path:'enrollee',children:[
    {path:'',component:OrderComponent},
    {path:'edit/:id',component:OrderComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
