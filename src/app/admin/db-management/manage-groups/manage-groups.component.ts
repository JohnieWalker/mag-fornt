import { Component, Output } from '@angular/core';
import { Group } from './group.model';

@Component({
  selector: 'bms-manage-groups',
  templateUrl: './manage-groups.component.html',
  styleUrls: ['./manage-groups.component.css']
})
export class ManageGroupsComponent {

  @Output() group: any;

  handleClickOnGroup(group) {
    this.group = group;
  }

}
