import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Login } from './Component/Login/login.component';
import { Datagrid } from './Component/Datagrid/datagrid.component';


const routes: Routes = [
  
  {
    path:'',
    component:Login
  },
  {
    path:'datagrids',
    component:Datagrid
  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
