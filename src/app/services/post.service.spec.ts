import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { PostService } from './post.service';
import { CouchDbView } from '../models/couch-db-view.model';
import { CouchDbViewRow } from '../models/couch-db-view-row.model';
import { Post } from '../models/post.model';
import { environment } from 'src/environments/environment';
import { DataService } from './data.service';

describe('PostService', () => {
  const byDatePublishedViewUrl: string = environment.couchDbUrl + '/_design/posts/_view/by_date_published';

  let service: PostService;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ],
    providers: [ PostService ]
  }));

  beforeEach(() => {
    service = TestBed.get(PostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get one post', inject([ DataService ], (dataService: DataService) => {
    const mockCouchDbView: CouchDbView = require('../../assets/mock-data/MockPostByDatePublishedCouchDbView.json');

    const mockPosts: Post[] = mockCouchDbView.rows.map((mockCouchDbViewRow: CouchDbViewRow) => {
      return mockCouchDbViewRow.value;
    });

    spyOn(dataService.db, 'query').and.returnValue(Promise.resolve(mockCouchDbView));

    service.getPosts().subscribe((posts: Post[]) => {
      expect(posts.length).toEqual(1);
      expect(posts).toEqual(mockPosts);
    });
  }));

  it('should get two posts', inject([ DataService ], (dataService: DataService) => {
    const mockCouchDbView: CouchDbView = require('../../assets/mock-data/MockPostsByDatePublishedCouchDbView.json');

    const mockPosts: Post[] = mockCouchDbView.rows.map((mockCouchDbViewRow: CouchDbViewRow) => {
      return mockCouchDbViewRow.value;
    });

    spyOn(dataService.db, 'query').and.returnValue(Promise.resolve(mockCouchDbView));

    service.getPosts().subscribe((posts: Post[]) => {
      expect(posts.length).toEqual(2);
      expect(posts).toEqual(mockPosts);
    });
  }));
});
