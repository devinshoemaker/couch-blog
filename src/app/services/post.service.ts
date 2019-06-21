import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { from, Observable } from 'rxjs';

import PouchDB from 'pouchdb';

import { CouchDbView } from '../models/couch-db-view.model';
import { CouchDbViewRow } from '../models/couch-db-view-row.model';
import { Post } from '../models/post.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  public db: any;
  private remote: string = environment.couchDbUrl;
  private byDatePublishedViewPath = 'posts/by_date_published';

  constructor() {
    this.db = new PouchDB('couchblog');

    const options = {
      live: true,
      retry: true
    };

    this.db.sync(this.remote, options);
  }

  public getPosts(): Observable<Post[]> {
    return from(this.db.query(this.byDatePublishedViewPath)).pipe(
      map((res: CouchDbView) => res.rows.map((rows: CouchDbViewRow) => rows.value as Post))
    ) as Observable<Post[]>;
  }

}
