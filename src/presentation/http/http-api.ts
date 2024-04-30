import { getLogger } from '@infrastructure/logging/index.js';
import type Api from '@presentation/api.interface.js';
import type { HttpApiConfig } from '@infrastructure/config/index.js';
import type { FastifyInstance, FastifyBaseLogger } from 'fastify';
import fastify from 'fastify';
import { notFound, forbidden, unauthorized, notAcceptable, domainError } from './decorators/index.js';
import type { DomainServices } from '@domain/index.js';
import AuthRouter from '@presentation/http/router/auth.js';
import UserRouter from './router/user.js';
import OauthRouter from './router/oauth.js';
import EventsRouter from './router/events.js';

const appServerLogger = getLogger('appServer');

export default class HttpApi implements Api {
  /**
   * Fastify server instance
   */
  private server: FastifyInstance | undefined;

  constructor(private readonly config: HttpApiConfig) { }

  public async init(domainServices: DomainServices): Promise<void> {
    this.server = fastify({logger: appServerLogger as FastifyBaseLogger});

    this.addDecorators();

    await this.addApiRoutes(domainServices);
  }

  /**
   * Registers all routers
   *
   * @param domainServices - instances of domain services
   */
  private async addApiRoutes(domainServices: DomainServices): Promise<void> {
    await this.server?.register(EventsRouter, {
      prefix: '/events',
      eventService: domainServices.eventsService,
    });

    await this.server?.register(OauthRouter, {
      prefix: '/oauth',
      userService: domainServices.userService,
      authService: domainServices.authService,
      cookieDomain: this.config.cookieDomain,
    });

    await this.server?.register(AuthRouter, {
      prefix: '/auth',
      authService: domainServices.authService,
    });

    await this.server?.register(UserRouter, {
      prefix: '/user',
      userService: domainServices.userService,
    });
  }

  /**
   * Runs http server
   */
  public async run(): Promise<void> {
    if (this.server === undefined) {
      throw new Error('Server is not initialized');
    }

    await this.server.listen({
      host: this.config.host,
      port: this.config.port,
    });
  }

  /**
  * Add custom decorators
  */
    private addDecorators(): void {
      this.server?.decorateReply('notFound', notFound);
      this.server?.decorateReply('forbidden', forbidden);
      this.server?.decorateReply('unauthorized', unauthorized);
      this.server?.decorateReply('notAcceptable', notAcceptable);
      this.server?.decorateReply('domainError', domainError);
    }
}
