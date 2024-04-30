import EventService from "@domain/service/events.js";
import type { FastifyPluginCallback } from 'fastify';
import fastify from "fastify";

interface EventsRouterOptions {
  eventService: EventService;
}

const EventsRouter: FastifyPluginCallback<EventsRouterOptions> = (fastify, opts, done) => {
  const eventService = opts.eventService;

  done();
}

export default EventsRouter;
