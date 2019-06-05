import { CouchDbViewRow } from './couch-db-view-row.model';

/* tslint:disable:variable-name */
export interface CouchDbView {

  total_rows: number;
  offset: number;
  rows: CouchDbViewRow[];

}
