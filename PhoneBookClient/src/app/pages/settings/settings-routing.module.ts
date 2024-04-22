import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralComponent } from './general/general.component';
import { RoleComponent } from './role/role.component';
import { TreeComponent } from './tree/tree.component';
import { PaysComponent } from './components/pays/pays.component';
import { VilleComponent } from './components/ville/ville.component';
import { TypeInstitutComponent } from './components/type-institut/type-institut.component';
import { InstitutComponent } from './components/institut/institut.component';
import { ImportContactsComponent } from './components/import-contacts/import-contacts.component';

const routes: Routes = [
  {
    path: "",
    component: PaysComponent
  },
  {
    path: "contact/import",
    component: ImportContactsComponent
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
  {
    path: "**",
    component: PaysComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
