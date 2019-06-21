import { Injectable } from '@angular/core';

import PouchDB from 'pouchdb';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public db: any;
  private remote: string = environment.couchDbUrl;

  constructor() {
    this.db = new PouchDB('couchblog');

    const options = {
      live: true,
      retry: true
    };

    this.sync(options);
  }

  sync (options) {
    this.db.sync(this.remote, options);
  }

}
