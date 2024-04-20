import type { Sequelize, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import { literal } from 'sequelize';
import { Model, DataTypes } from 'sequelize';
import type Orm from '@repository/storage/postgres/orm/sequelize/index.js';
import type User from '@domain/entities/user.js';

/**
 * Query options for getting user
 */
interface GetUserQueryOptions {
  /**
   * User id
   */
  id?: number;

  /**
   * User email
   */
  email?: string;
}

interface InsertUserOptions {
  /**
   * User email
   */
  email: string;

  /**
   * User name
   */
  name: string;
}

/**
 * Class representing a user model in database
 */
export class UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
  /**
   * User id
   */
  public declare id: CreationOptional<number>;

  /**
   * User email address
   */
  public declare email: string;

  /**
   * User name
   */
  public declare name: string;
}

/**
 * Class representing a table storing users
 */
export default class UserSequelizeStorage {
  /**
   * User model in database
   */
  public model: typeof UserModel;

  /**
   * Database instance
   */
  private readonly database: Sequelize;

  /**
   * Table name
   */
  private readonly tableName = 'users';

  /**
   * Constructor for user storage
   *
   * @param ormInstance - ORM instance
   */
  constructor({ connection }: Orm) {
    this.database = connection;

    /**
     * Initiate user model
     */
    this.model = UserModel.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      tableName: this.tableName,
      sequelize: this.database,
      timestamps: false,
    });
  }

  /**
   * Insert user
   *
   * @param options - options to insert user
   * @returns { Promise<User> } inserted user
   */
  public async insertUser({
    email,
    name,
  }: InsertUserOptions): Promise<User> {
    return await this.model.create({
      email,
      name,
    });
  }

  /**
   * Get user by id or email
   *
   * @param options - query options
   * @returns { Promise<User | null> } found user
   */
  public async getUserByIdOrEmail({
    id,
    email,
  }: GetUserQueryOptions): Promise<User | null> {
    let user: UserModel | null;

    /**
     * Check if id or email is provided
     */
    if (id !== undefined) {
      /**
       * Find user by id
       */
      user = await this.model.findOne({
        where: {
          id,
        },
      });
    } else if (email !== undefined) {
      /**
       * Find user by email
       */
      user = await this.model.findOne({
        where: {
          email,
        },
      });
    } else {
      /**
       * No id or email provided
       */
      return null;
    }

    if (!user) {
      return null;
    }

    return user;
  }
}
