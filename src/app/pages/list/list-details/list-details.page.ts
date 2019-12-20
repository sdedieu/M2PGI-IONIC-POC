import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { ListService } from 'src/app/services/list.service';
import { switchMap } from 'rxjs/operators';
import { List } from 'src/app/model/list';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.page.html',
  styleUrls: ['./list-details.page.scss'],
})
export class ListDetailsPage implements OnInit {
  list$: Observable<List>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private listService: ListService) { }

  ngOnInit() {
      this.list$ = this.route.paramMap.pipe(
        switchMap((params: ParamMap) =>
          this.listService.getOne(params.get('id')))
      );
  }

}
