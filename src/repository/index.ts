import type { DatabaseConfig } from '@infrastructure/config/index.js';
import Orm from './storage/postgres/orm/index.js';
import EventsRepository from '@repository/events.repository.ts';
import UserSessionRepository from '@repository/userSession.repository.js';
import UserRepository from '@repository/user.repository.ts';
import UserSessionStorage from './storage/userSession.storage.js';
import UserStorage from './storage/user.storage.js';
import EventStorage from './storage/events.storage.js';

export interface Repositories {
  eventsRepository: EventsRepository;

  userSessionRepository: UserSessionRepository,

  userRepository: UserRepository;
}

/**
 * Initiate ORM
 *
 * @param databaseConfig - database config
 */
export async function initORM(databaseConfig: DatabaseConfig): Promise<Orm> {
  const orm = new Orm(databaseConfig);

  /**
   * Test the connection by trying to authenticate
   */
  await orm.authenticate();

  return orm;
}

/**
 * Initiate repositories
 *
 * @param orm - ORM instance
 * @param s3Config - S3 storage config
 */
export async function init(orm: Orm, s3Config: S3StorageConfig): Promise<Repositories> {
  /**
   * Create storage instances
   */
  const userSessionsStorage = new UserSessionStorage(orm);
  const eventStorage = new  EventStorage(orm);
  const userStorage = new UserStorage(orm)

  await userSessionsStorage.model.sync();
  await eventStorage.model.sync();
  await userStorage.model.sync();

  const eventsRepository = new EventsRepository(eventStorage);
  const userSessionRepository = new UserSessionRepository(userSessionsStorage);
  const userRepository = new UserRepository(userStorage);

  return {
    eventsRepository,
    userSessionRepository,
    userRepository,
  }
}

