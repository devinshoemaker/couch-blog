import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { of } from 'rxjs';

import { HomePage } from './home.page';
import { PostService } from '../services/post.service';
import { CouchDbView } from '../models/couch-db-view.model';
import { CouchDbViewRow } from '../models/couch-db-view-row.model';
import { Post } from '../models/post.model';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [ HttpClientTestingModule ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title', () => {
    expect(fixture.debugElement.nativeElement.querySelector('ion-title').textContent).toContain('Couch Blog');
  });

  it('should get one post on init',
    inject([PostService], (postService: PostService) => {
      const mockCouchDbView: CouchDbView = require('../../assets/mock-data/MockPostByDatePublishedCouchDbView.json');

      const mockPosts: Post[] = mockCouchDbView.rows.map((mockCouchDbViewRow: CouchDbViewRow) => {
        return mockCouchDbViewRow.value;
      });

      spyOn(postService, 'getPosts').and.returnValue(of(mockPosts));

      component.ngOnInit();
      fixture.detectChanges();

      const compiled = fixture.debugElement.nativeElement;
      const postElements: NodeList = compiled.querySelectorAll('.posts');

      expect(postElements.length).toBe(1);
      expect(postElements[0].textContent).toContain('Mock Title');
    })
  );

  it('should get two posts on init',
    inject([PostService], (postService: PostService) => {
      const mockCouchDbView: CouchDbView = require('../../assets/mock-data/MockPostsByDatePublishedCouchDbView.json');

      const mockPosts: Post[] = mockCouchDbView.rows.map((mockCouchDbViewRow: CouchDbViewRow) => {
        return mockCouchDbViewRow.value;
      });

      spyOn(postService, 'getPosts').and.returnValue(of(mockPosts));

      component.ngOnInit();
      fixture.detectChanges();

      const compiled = fixture.debugElement.nativeElement;
      const postElements: NodeList = compiled.querySelectorAll('.posts');

      expect(postElements.length).toBe(2);
      expect(postElements[0].textContent).toContain('Mock Title 1');
      expect(postElements[1].textContent).toContain('Mock Title 2');
    })
  );
});
