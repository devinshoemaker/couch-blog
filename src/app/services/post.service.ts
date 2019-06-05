import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { CouchDbView } from '../models/couch-db-view.model';
import { CouchDbViewRow } from '../models/couch-db-view-row.model';
import { Post } from '../models/post.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private byDatePublishedViewUrl: string = environment.couchDbUrl + '/_design/posts/_view/by_date_published';

  constructor(private http: HttpClient) { }

  public getPosts(): Observable<Post[]> {
    return this.http.get(this.byDatePublishedViewUrl).pipe(
      map((res: CouchDbView) => res.rows.map((rows: CouchDbViewRow) => rows.value as Post))
    );
  }

}
