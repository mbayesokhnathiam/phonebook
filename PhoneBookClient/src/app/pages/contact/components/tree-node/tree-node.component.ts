import { Component, Input } from '@angular/core';
import { TreeItem } from './tree.model';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-tree-node',
  standalone: false,
  templateUrl: './tree-node.component.html',
  styleUrl: './tree-node.component.scss'
})
export class TreeNodeComponent {

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
