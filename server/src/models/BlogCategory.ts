import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class BlogCategory extends Model {
  public id!: number;
  public name!: string;
  public slug!: string;
}

BlogCategory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: 'blog_categories',
  }
);

export default BlogCategory;
