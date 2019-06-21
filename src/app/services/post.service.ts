import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { from, Observable } from 'rxjs';

import { DataService } from './data.service';
import { CouchDbView } from '../models/couch-db-view.model';
import { CouchDbViewRow } from '../models/couch-db-view-row.model';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  private byDatePublishedViewPath = 'posts/by_date_published';

  constructor(private dataService: DataService) { }

  public getPosts(): Observable<Post[]> {
    return from(this.dataService.db.query(this.byDatePublishedViewPath)).pipe(
      map((res: CouchDbView) => res.rows.map((rows: CouchDbViewRow) => rows.value as Post))
    ) as Observable<Post[]>;
  }

}
