import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { TreeNodeComponent } from './components/tree-node/tree-node.component';
import { SearchComponent } from './components/search/search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbNavModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { TreeNodeVilleComponent } from "./components/tree-node-ville/tree-node-ville.component";
import { TreeNodeTypeComponent } from "./components/tree-node-type/tree-node-type.component";
import { TreeNodeInstitutComponent } from './components/tree-node-institut/tree-node-institut.component';
import { CreerContactComponent } from './components/creer-contact/creer-contact.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { DetailComponent } from './components/detail/detail.component';

@NgModule({
    declarations: [
        TreeNodeComponent,
        SearchComponent,
        TreeNodeVilleComponent,
        TreeNodeTypeComponent,
        TreeNodeInstitutComponent,
        CreerContactComponent,
        DetailComponent
    ],
    imports: [
        CommonModule,
        ContactRoutingModule,
        ReactiveFormsModule,
        NgbDropdownModule,
        NgbPaginationModule,
        HttpClientModule,
        CKEditorModule,
        NgbNavModule,
        
    ]
})
export class ContactModule { }
