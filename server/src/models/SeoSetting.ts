import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class SeoSetting extends Model {
  public id!: number;
  public page!: string;
  public title!: string;
  public description!: string;
  public keywords!: string;
  public image!: string;
  public schema_markup!: string;
  public canonical_url!: string;
  public robots!: string;
  public og_type!: string;
  public twitter_card!: string;
}

SeoSetting.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    page: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // "home", "about", etc.
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    keywords: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    schema_markup: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    canonical_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    robots: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'index, follow',
    },
    og_type: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'website',
    },
    twitter_card: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'summary_large_image',
    }
  },
  {
    sequelize,
    tableName: 'seo_settings',
  }
);

export default SeoSetting;
