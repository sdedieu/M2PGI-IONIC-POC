import { Component, OnInit } from '@angular/core';
import { List } from 'src/app/model/list';
import { ListService } from 'src/app/services/list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.page.html',
  styleUrls: ['./add-list.page.scss'],
})
export class AddListPage {
  private title: string = '';
  private subtitle: string = '';
  private avatar: any = '';

  constructor(private listService: ListService, private router: Router) { }

  addList(){
    const list: List = { title: this.title, subtitle: this.subtitle, avatar: this.avatar }
    this.listService.add(list).then((res) =>
      this.router.navigate(['/'])
    ).catch(err => console.log(err));

  }

}
