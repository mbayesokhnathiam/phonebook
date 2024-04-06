import { Component, Input } from '@angular/core';
import { TreeItem } from '../tree-node/tree.model';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-tree-node-type',
  templateUrl: './tree-node-type.component.html',
  styleUrl: './tree-node-type.component.scss'
})
export class TreeNodeTypeComponent {
  @Input()
  level1Data!: TreeItem[];
  

  constructor(private contactService: ContactService){

  }

  sendIdInstitut(id: number){
    this.contactService.setSharedData(id);
  }

  toggleCollapse(item: TreeItem): void {
    item.expanded = !item.expanded;
  }
}
