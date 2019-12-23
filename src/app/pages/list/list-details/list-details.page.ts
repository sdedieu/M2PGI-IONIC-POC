import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ListService } from 'src/app/services/list.service';
import { switchMap } from 'rxjs/operators';
import { List } from 'src/app/model/list';
import { Observable } from 'rxjs';
import { Item } from 'src/app/model/item';
import { ModalController } from '@ionic/angular';
import { AddOwnerPage } from '../../modal/add-owner/add-owner.page';

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
    private listService: ListService,
    public modalController: ModalController) { }

  ngOnInit() {
    this.list$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.listService.getOne(params.get('id')))
    );
  }

  leaveIt() {
    this.listService.leave(this.route.snapshot.paramMap.get('id'))
      .then(res => {
        this.router.navigate(['/tabs/list'])
      })
      .catch(err => console.log("err:" + err));
  }

  removeItem(item: Item) {
    this.listService.removeItem(this.route.snapshot.paramMap.get('id'), item.id);
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: AddOwnerPage,
      componentProps: {
        'listId': this.route.snapshot.paramMap.get('id')
      }
    });

    modal.onDidDismiss()
      .then(ev => {
        if (ev.data.length) {
          this.listService.addOwner(this.route.snapshot.paramMap.get('id'), ev.data);
        }
      });

    return await modal.present();
  }
}
