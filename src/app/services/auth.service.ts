import { Injectable, NgZone } from '@angular/core';
import * as firebase from 'firebase';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';
import { Facebook } from '@ionic-native/facebook/ngx';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private platform: Platform, 
    private zone: NgZone, 
    private facebook: Facebook,
    private userService: UserService
    ) { }

  init(): void {
    // Emit logged in status whenever auth state changes
    firebase.auth().onAuthStateChanged(firebaseUser => {
      this.zone.run(() => {
        firebaseUser ? this.loggedIn.next(true) : this.loggedIn.next(false);
      });
    });
  }


  async login(type, data): Promise<any> {
    if (type === 'fb') {
      if (this.platform.is("capacitor")) {
        this.nativeFacebookAuth();
      } else {
        this.browserFacebookAuth();
      }
    } else {
      return firebase.auth().signInWithEmailAndPassword(data.email, data.password);
    }
  }

  async logout(): Promise<void> {
    if (this.platform.is("capacitor")) {
      try {
        await this.facebook.logout(); // Unauth with Facebook
        await firebase.auth().signOut(); // Unauth with Firebase
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await firebase.auth().signOut();
      } catch (err) {
        console.log(err);
      }
    }
  }

  async nativeFacebookAuth(): Promise<void> {
    try {
      const response = await this.facebook.login(["public_settings", "email"]);

      console.log(response);

      if (response.authResponse) {
        // User is signed-in Facebook.
        const unsubscribe = firebase.auth().onAuthStateChanged(firebaseUser => {
          unsubscribe();
          // Check if we are already signed-in Firebase with the correct user.
          if (!this.isUserEqual(response.authResponse, firebaseUser)) {
            // Build Firebase credential with the Facebook auth token.
            const credential = firebase.auth.FacebookAuthProvider.credential(
              response.authResponse.accessToken
            );
            // Sign in with the credential from the Facebook user.
            firebase
              .auth()
              .signInWithCredential(credential)
              .catch(error => {
                console.log(error);
              });
          } else {
            // User is already signed-in Firebase with the correct user.
            console.log("already signed in");
          }
        });
      } else {
        // User is signed-out of Facebook.
        firebase.auth().signOut();
      }
    } catch (err) {
      console.log(err);
    }
  }

  async browserFacebookAuth(): Promise<void> {
    const provider = new firebase.auth.FacebookAuthProvider();

    try {
      const result = await firebase.auth().signInWithPopup(provider);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }

  isUserEqual(facebookAuthResponse, firebaseUser): boolean {
    if (firebaseUser) {
      const providerData = firebaseUser.providerData;

      providerData.forEach(data => {
        if (
          data.providerId === firebase.auth.FacebookAuthProvider.PROVIDER_ID &&
          data.uid === facebookAuthResponse.userID
        ) {
          // We don't need to re-auth the Firebase connection.
          return true;
        }
      });
    }

    return false;
  }

  async register(data): Promise<firebase.auth.UserCredential>{
    const res = await firebase.auth().createUserWithEmailAndPassword(data.email, data.password);    
    const user = firebase.auth().currentUser;
    await this.userService.add({id: user.uid, email: user.email});
    return res;
  }
}
