import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

export class ClientLogo extends Model {
  public id!: number;
  public name!: string;
  public imageUrl!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ClientLogo.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Client Logo',
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'client_logos',
    sequelize,
  }
);
