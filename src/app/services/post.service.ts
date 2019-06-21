import { Injectable, NgZone } from '@angular/core';

import { Subject } from 'rxjs';

import { DataService } from './data.service';
import { CouchDbView } from '../models/couch-db-view.model';
import { CouchDbViewRow } from '../models/couch-db-view-row.model';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  private postSubject: Subject<Post[]> = new Subject();

  private byDatePublishedViewPath = 'posts/by_date_published';

  constructor(private dataService: DataService, private zone: NgZone) {
    this.dataService.db.changes({live: true, since: 'now', include_docs: true}).on('change', (change: any) => {
      if (change.doc.type === 'post' || change.deleted) {
          this.emitPosts();
      }
    });
  }

  public getPosts(): Subject<Post[]> {
    this.emitPosts();

    return this.postSubject;
  }

  emitPosts(): void {
    this.zone.run(() => {
        this.dataService.db.query('posts/by_date_published').then((data: CouchDbView) => {
            let posts: Post[] = data.rows.map((row: CouchDbViewRow) => {
                return row.value;
            });

            this.postSubject.next(posts);
        });
    });
  }

}
