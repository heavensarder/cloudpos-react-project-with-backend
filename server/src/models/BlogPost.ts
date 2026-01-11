import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import BlogCategory from './BlogCategory';
import User from './User';

class BlogPost extends Model {
  public id!: number;
  public title!: string;
  public slug!: string;
  public content!: string;
  public excerpt!: string;
  public image!: string;
  public status!: 'draft' | 'published';
  public category_id!: number;
  public author_id!: number;
  public views!: number;
  
  // SEO fields
  public seo_title!: string;
  public seo_description!: string;
  public seo_keywords!: string;
  public schema_markup!: string;
  public canonical_url!: string;
  public robots!: string;
  public og_type!: string;
  public twitter_card!: string;
}

BlogPost.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    excerpt: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('draft', 'published'),
      defaultValue: 'draft',
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    // SEO
    seo_title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    seo_description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    seo_keywords: {
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
      defaultValue: 'index, follow',
    },
    og_type: {
      type: DataTypes.STRING,
      defaultValue: 'article',
    },
    twitter_card: {
      type: DataTypes.STRING,
      defaultValue: 'summary_large_image',
    },
  },
  {
    sequelize,
    tableName: 'blog_posts',
  }
);

// Relationships
BlogPost.belongsTo(BlogCategory, { foreignKey: 'category_id', as: 'category' });
BlogCategory.hasMany(BlogPost, { foreignKey: 'category_id', as: 'posts' });

BlogPost.belongsTo(User, { foreignKey: 'author_id', as: 'author' });
User.hasMany(BlogPost, { foreignKey: 'author_id', as: 'posts' });

export default BlogPost;
