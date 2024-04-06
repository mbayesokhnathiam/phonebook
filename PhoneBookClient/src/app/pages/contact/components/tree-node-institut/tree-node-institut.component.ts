import { Component, Input } from '@angular/core';
import { TreeItem } from '../tree-node/tree.model';
import { Institut } from '../../models/institut.model';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-tree-node-institut',
  templateUrl: './tree-node-institut.component.html',
  styleUrl: './tree-node-institut.component.scss'
})
export class TreeNodeInstitutComponent {
  @Input()
  institut!: Institut;

  constructor(private contactService: ContactService){

  }

  sendIdInstitut(id: number){
    this.contactService.setSharedData(id);
  }
  
}
