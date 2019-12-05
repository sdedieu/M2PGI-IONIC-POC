import { Injectable } from '@angular/core';
import { Item } from '../model/item';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private ItemsCollection: AngularFirestoreCollection<Item>;
 
  private items: Observable<Item[]>;
 
  constructor(db: AngularFirestore) {
    this.ItemsCollection = db.collection<Item>('items');
 
    this.items = this.ItemsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
 
  getItems() {
    return this.items;
  }
 
  getItem(id) {
    return this.ItemsCollection.doc<Item>(id).valueChanges();
  }
}