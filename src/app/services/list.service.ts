import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable, combineLatest } from 'rxjs';
import { map, flatMap, filter } from 'rxjs/operators';
import { List } from '../model/list';
import { Item } from '../model/item';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private listsCollection: AngularFirestoreCollection<List>;

  private lists: Observable<List[]>;

  constructor(private db: AngularFirestore) {
    this.listsCollection = db.collection<List>('Lists');

    this.lists = this.listsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data()
          const id = a.payload.doc.id;          
          return { id, ...data };
        }).filter(list => list.owners.includes(firebase.auth().currentUser.uid))
      })
    );
  }

  get() {
    return this.lists;
  }

  convertSnapshots<T>(snaps) {
    return <T[]>snaps.map(snap => {
      return {
        id: snap.payload.doc.id,
        ...snap.payload.doc.data()
      };
    });
  }

  convertDocument<T>(snap) {
    return {
      id: snap.payload.id,
      ...snap.payload.data()
    };
  }

  getOne(_id) {
    return this.listsCollection.doc<List>(_id).snapshotChanges().pipe(
      flatMap(snapshot => {
        let list: List = {
          id: snapshot.payload.id,
          ...snapshot.payload.data()
        };
        return this.listsCollection.doc<List>(_id).collection<Item>('items')
          .snapshotChanges()
          .pipe(
            map(this.convertSnapshots),
            map((items: Array<Item>) => {
              list.items = items;
              return list;
            })
          )
      })
    );
  }

  update(list: List, id: string) {
    return this.listsCollection.doc(id).update(list);
  }

  add(list: List) {
    const user = firebase.auth().currentUser;
    list.owners.push(user.uid);
    return this.listsCollection.add(list);
  }

  addItem(listId: string, item: Item) {
    return this.listsCollection.doc(listId)
      .collection('items')
      .add(item);
  }

  addOwner(listId: string, owners: Array<string>) {
      return this.listsCollection.doc(listId).update({ "owners": firebase.firestore.FieldValue.arrayUnion(...owners) });
  }

  leave(listId) {
    const user = firebase.auth().currentUser;
    return this.listsCollection.doc(listId).update({
      "owners": firebase.firestore.FieldValue.arrayRemove(user.uid)
    });
  }

  removeOne(id) {
    return this.listsCollection.doc(id).delete();
  }

  removeItem(listId, itemId) {
    return this.listsCollection.doc(listId)
      .collection('items')
      .doc(itemId)
      .delete();
  }
}
