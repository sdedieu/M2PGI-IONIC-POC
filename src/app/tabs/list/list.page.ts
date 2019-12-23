import { Component, OnInit } from '@angular/core';
import { ListService } from 'src/app/services/list.service';
import { List } from 'src/app/model/list';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

  private lists: Array<List> = [];

  constructor(private listService: ListService) {}

  ngOnInit(): void {
    this.listService.get().subscribe(res => {
      this.lists = res;
    });
  }
 
  removeOne(list) {
    this.listService.removeOne(list.id);
  }

}
