import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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

  constructor(private router: Router) { }

  ngOnInit() {
  }
  
  register(event) {
    event.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
     .then(
       res => {
        this.submited.emit("Registered !");        
        this.router.navigate(['/home']);
       },
       err => console.log(err))
  }
}
