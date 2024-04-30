import EventRepository from '@repository/events.repository.js'

export default class EventService {
  public eventRepository: EventRepository;

  constructor(eventRepository: EventRepository) {
    this.eventRepository = eventRepository;
  }
}
