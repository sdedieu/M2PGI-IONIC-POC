import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/model/item';
import { ListService } from 'src/app/services/list.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.page.html',
  styleUrls: ['./add-item.page.scss'],
})
export class AddItemPage {
  private title: string = '';

  constructor(
    private listService: ListService,
    private route: ActivatedRoute,
    private router: Router) { }

  addItem() {
    const id = this.route.snapshot.paramMap.get('id')
    const item: Item = { title: this.title };
    this.listService.addItem(id, item)
      .then((res) =>
        this.router.navigate(['/list', id])
      ).catch(err => console.log(err));
  }
}
