import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/model/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-owner',
  templateUrl: './add-owner.page.html',
  styleUrls: ['./add-owner.page.scss'],
})
export class AddOwnerPage implements OnInit {

  private users: Array<User> = [];

  // Data passed in by componentProps
  @Input() listId: string;
  constructor(private route: ActivatedRoute,
    private userService: UserService,
    private viewCtrl: ModalController) { }

  ngOnInit() {
    console.log(this.viewCtrl)
    this.userService.get(this.listId).subscribe(res => {
      this.users = res;
    });
  }

  dismiss() {
    this.viewCtrl.dismiss(this.users.filter(user => user.isChecked).map(user => user.id));
  }

}
