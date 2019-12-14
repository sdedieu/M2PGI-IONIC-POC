import { Component } from '@angular/core';
import { Item } from '../model/item';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  private list: Array<Item> = [];

  constructor() {}

}
