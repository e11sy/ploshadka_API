import EventService from "@domain/service/events.js";
import type { FastifyPluginCallback } from 'fastify';
import Event from "@domain/entities/event.js";

interface EventsRouterOptions {
  eventService: EventService;
}

const EventsRouter: FastifyPluginCallback<EventsRouterOptions> = (fastify, opts, done) => {
  const eventService = opts.eventService;

  fastify.post<{
    Body: Event;
    Reply: Event | null;
  }>('/', async (request, reply) => {
    const { name, courtId, time, description } = request.body;

    const event = await eventService.createEvent(courtId, name, time, description);

    return reply.send(event)
  })

  fastify.get<{
    Params: { name: Event['name'] },
    Reply: Event,
  }>('/:name', async ( request, reply ) => {
    console.log('lalalallalalala', request.params);
    const name = request.params.name;

    const event = await eventService.getEventByName(name);

    if (event === null) {
      return reply.notFound('Event with this name not found');
    }

    return reply.send(event);
  })

  done();
}

export default EventsRouter;
