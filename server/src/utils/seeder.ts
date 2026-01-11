import User from '../models/User';
import SeoSetting from '../models/SeoSetting';
import BlogCategory from '../models/BlogCategory';
import BlogPost from '../models/BlogPost';
import bcrypt from 'bcryptjs';

export const seedDatabase = async () => {
  try {
    // Sync tables
    await User.sync();
    await SeoSetting.sync({ alter: true });
    await BlogCategory.sync({ alter: true });
    await BlogPost.sync({ alter: true });

    // Check if admin exists
    const adminEmail = 'admin@mediasoftbd.com';
    const adminExists = await User.findOne({ where: { email: adminEmail } });

    if (!adminExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('Mediasoft2026@#', salt);

      await User.create({
        email: adminEmail,
        password: hashedPassword,
      });
      console.log('Admin user seeded');
    }

    // Check if SEO settings exist for home
    const homeSeo = await SeoSetting.findOne({ where: { page: 'home' } });
    if (!homeSeo) {
      await SeoSetting.create({
        page: 'home',
        title: 'CloudPOS - Mediasoft Data Systems Ltd',
        description: 'Welcome to CloudPOS - The best Point of Sale system',
        image: 'https://placehold.co/600x400',
        keywords: 'pos, cloud, retail',
        schema_markup: '',
        canonical_url: '',
        robots: 'index, follow',
        og_type: 'website',
        twitter_card: 'summary_large_image',
      });
      console.log('Home SEO seeded');
    }
  } catch (error) {
    console.error('Seeding error:', error);
  }
};
