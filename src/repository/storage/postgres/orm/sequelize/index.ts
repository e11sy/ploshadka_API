import type { DatabaseConfig } from '@infrastructure/config/index.js';
import { Sequelize } from 'sequelize';

/**
 * Class for creating database connection
 */
export default class SequelizeOrm {
  /**
   * Database configuration
   */
  private config: DatabaseConfig;

  /**
   * Database instance
   */
  private readonly conn: Sequelize;

  /**
   * Constructor for class
   *
   * @param databaseConfig - database config
   */
  constructor(databaseConfig: DatabaseConfig) {
    this.config = databaseConfig;

    this.conn = new Sequelize(this.config.dsn, {
      define: {
        /**
         * Use snake_case for fields in db, but camelCase in code
         */
        underscored: true,
      },
    });
  }

  /**
   * Test the connection by trying to authenticate
   */
  public async authenticate(): Promise<void> {
    /**
     * Make sure that database is connected
     */
    try {
      await this.conn.authenticate();
    } catch (error) {
    }
  }

  /**
   * Get database connection
   */
  public get connection(): Sequelize  {
    return this.conn;
  }
}
