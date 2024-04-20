import EventsStorage from '@repository/storage/events.storage.js'

export default class EventsRepository {
  public storage: EventsStorage;

  constructor(storage: EventsStorage) {
    this.storage = storage;
  }

  /**
   * @todo make functions
   */
}
