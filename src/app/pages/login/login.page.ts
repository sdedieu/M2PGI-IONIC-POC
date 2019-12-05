import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email;
  password;

  @Output()
  submited: EventEmitter<string> = new EventEmitter<string>();

  constructor(private router: Router) { }

  ngOnInit() {
  }
  
  login(event) {
    event.preventDefault();
    firebase.auth().signInWithEmailAndPassword(this.email, this.password)
     .then(
       res => {
        this.submited.emit("Logged in !");        
        this.router.navigate(['/home']);
       },
       err => console.log(err))
  }
}
