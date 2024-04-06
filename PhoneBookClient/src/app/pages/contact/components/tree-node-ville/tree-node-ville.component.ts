import { Component, Input } from '@angular/core';
import { TreeItem } from '../tree-node/tree.model';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-tree-node-ville',
  templateUrl: './tree-node-ville.component.html',
  styleUrl: './tree-node-ville.component.scss'
})
export class TreeNodeVilleComponent {
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
