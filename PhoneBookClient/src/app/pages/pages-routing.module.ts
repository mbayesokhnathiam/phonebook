import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component pages

import { AdvancedSearchComponent } from './contact/components/advanced-search/advanced-search.component';

const routes: Routes = [
    {
        path: '',
        component: AdvancedSearchComponent
    },
    { path: '', redirectTo:'contact', pathMatch: "full"},
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
