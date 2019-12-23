import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
    ActivatedRoute,
} from '@angular/router';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private route: ActivatedRoute) { }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
        return new Promise((resolve, reject) => {
            firebase.auth().onAuthStateChanged((user: firebase.User) => {
                if (user) {
                    if (this.route.url) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                } else {
                    console.log('User is not logged in');
                    this.router.navigate(['/login']);
                    resolve(false);
                }
            });
        });
    }
}