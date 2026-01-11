import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class SiteSetting extends Model {
  public id!: number;
  public navbarLogoLight!: string;
  public navbarLogoDark!: string;
  public footerLogo!: string;
  public favicon!: string;
}

SiteSetting.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    navbarLogoLight: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    navbarLogoDark: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    footerLogo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    favicon: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'site_settings',
  }
);

export default SiteSetting;
