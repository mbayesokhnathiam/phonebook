import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { CreateUsersComponent } from './components/create-users/create-users.component';

const routes: Routes = [
  
  {
    path: 'list', component: ListUsersComponent
  },
  {
    path: '', redirectTo:'list', pathMatch: 'full'
    
  },
  {
    path: '**', redirectTo: 'list', pathMatch: 'full'
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
