import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

export class Testimonial extends Model {
  public id!: number;
  public text!: string;
  public author!: string;
  public designation!: string;
  public logoUrl!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Testimonial.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    designation: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Client',
    },
    logoUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'testimonials',
    sequelize,
  }
);
