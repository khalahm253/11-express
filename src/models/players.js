'use stict';

import uuid from 'uuid/v4';
import storage from '../lib/storage/data-store.js';

class Players {

  constructor(record) {
    this.id = uuid();
    this.player = record && record.player || '';
    this.position = record && record.position || '';
   
  }

  static fetchAll() {
    return storage.fetchAll();
  }

  static fetchOne(id) {
    return storage.fetchOne(id);
  }

  static deleteOne(id) {
    return storage.delete(id);
  }

  save() {
    return storage.save(this);
  }

};

export default Players;