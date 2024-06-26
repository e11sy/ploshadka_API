import type { Sequelize, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import Event from "@domain/entities/event.js";
import { Model, DataTypes } from 'sequelize';
import type Orm from '@repository/storage/postgres/orm/sequelize/index.js';


export class EventsModel extends Model<InferAttributes<EventsModel>, InferCreationAttributes<EventsModel>> {
  public declare id : CreationOptional<number>;

  public declare courtId: Event['courtId'];

  public declare name: Event['name'];

  public declare description: CreationOptional<Event['description']>;

  public declare time: Event['time'];
}

export default class EventSequelizeStorage {
  public model: typeof EventsModel;

  private readonly database: Sequelize;

  private readonly tableName = 'events';

  constructor({ connection }: Orm) {
    this.database = connection;

    this.model = EventsModel.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      courtId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      time: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
    }, {
      tableName: this.tableName,
      sequelize: this.database,
    });
  };
}
