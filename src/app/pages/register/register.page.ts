import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  email;
  password;
  passwordConfirmation;

  @Output()
  submited: EventEmitter<string> = new EventEmitter<string>();

  constructor(private router: Router,
    public authService: AuthService) { }

  async register() {
    this.authService.register({ email: this.email, password: this.password }).then(res => {
      this.submited.emit("Registered !");
      this.router.navigate(['/']);
    },
      err => console.log(err));
  }
}
