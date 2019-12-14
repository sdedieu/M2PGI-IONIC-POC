import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NavController, LoadingController } from '@ionic/angular';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private loading: HTMLIonLoadingElement;
  private email: string;
  private password: string;

  @Output()
  submited: EventEmitter<string> = new EventEmitter<string>();

  constructor(private router: Router,
    public authService: AuthService,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController) { }

  async ngOnInit() {
    await this.showLoading();

    this.authService.loggedIn.subscribe(status => {
      this.loading.dismiss();
      if (status) {
        this.navCtrl.navigateForward('/');
      }
    });
  }

  async loginFb() {
    await this.showLoading();
    this.authService.login('fb', null).then(res => {
      this.submited.emit("Logged in !");
      this.router.navigate(['/']);
    },
      err => console.log(err))
  }

  async showLoading() {
    this.loading = await this.loadingCtrl.create({
      message: "Authenticating..."
    });

    this.loading.present();
  }

  async loginReg() {
    await this.showLoading();
    this.authService.login('reg', { email: this.email, password: this.password }).then(res => {
      this.submited.emit("Logged in !");
      this.router.navigate(['/']);
      this.loading.dismiss();
    }).catch(err => { 
      console.log(err);
      this.loading.dismiss();
     });
      
  }
      
}
