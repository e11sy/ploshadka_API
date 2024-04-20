import type Api from '@presentation/api.interface.js';
import type { FastifyInstance } from 'fastify';

export default class HttpApi implements Api {
  /**
   * Fastify server instance
   */
  private server: FastifyInstance | undefined;
}
