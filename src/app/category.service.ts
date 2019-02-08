import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories: Observable<any[]>;
  constructor(private db: AngularFireDatabase) { }

  getCategories(){
    return this.db.list('/categories', ref => ref.orderByChild('name'))
      .snapshotChanges().pipe(map(actions => actions.map(a => ({key: a.key, ...a.payload.val()}))));
  }
}
