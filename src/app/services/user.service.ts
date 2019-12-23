import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map, filter, flatMap, mapTo } from 'rxjs/operators';
import * as firebase from 'firebase';
import { ListService } from './list.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersCollection: AngularFirestoreCollection<User>;

  private users: Observable<User[]>;

  constructor(private db: AngularFirestore, private listService: ListService) {
    this.usersCollection = db.collection<User>('Users');

    this.users = this.usersCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }).filter(user =>
          user.id !== firebase.auth().currentUser.uid
        );
      })
    );
  }

  get(listId: string): Observable<User[]> {
    return this.listService.getOne(listId).pipe(flatMap(
      list => this.users.pipe(map(
        users => users.filter(
          user => !list.owners.includes(user.id)
        )
      ))
    ))
  }

  add(user) {
    return this.usersCollection.add(user);
  }
}
