import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralComponent } from './general/general.component';
import { RoleComponent } from './role/role.component';
import { TreeComponent } from './tree/tree.component';
import { PaysComponent } from './components/pays/pays.component';
import { VilleComponent } from './components/ville/ville.component';
import { TypeInstitutComponent } from './components/type-institut/type-institut.component';
import { InstitutComponent } from './components/institut/institut.component';

const routes: Routes = [
  {
    path: "general",
    component: GeneralComponent
  },
  {
    path: "role",
    component: RoleComponent
  },
  {
    path: "tree",
    component: TreeComponent
  },
  {
    path: "**",
    component: GeneralComponent
  },
  {
    path: "pays",
    component: PaysComponent
  },
  {
    path: "ville",
    component: VilleComponent
  },
  {
    path: "type",
    component: TypeInstitutComponent
  },
  {
    path: "institut",
    component: InstitutComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
