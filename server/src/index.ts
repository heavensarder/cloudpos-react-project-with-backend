import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/database';
import authRoutes from './routes/authRoutes';
import seoRoutes from './routes/seoRoutes';
import { seedDatabase } from './utils/seeder';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

import uploadRoutes from './routes/uploadRoutes';
import blogRoutes from './routes/blogRoutes';
import clientLogoRoutes from './routes/clientLogoRoutes';
import testimonialRoutes from './routes/testimonialRoutes';
import siteSettingRoutes from './routes/siteSettingRoutes';
import { seedClientLogos } from './controllers/clientLogoController';
import { seedTestimonials } from './controllers/testimonialController';
import { seedSettings } from './controllers/siteSettingController';
import path from 'path';

// ... other imports ...

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/seo', seoRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/client-logos', clientLogoRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/site-settings', siteSettingRoutes);

// Serve uploads statically
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Database & Server
sequelize.authenticate()
  .then(async () => {
    console.log('Database connected...');
    await sequelize.sync(); // Ensure tables exist
    await seedDatabase();
    await seedClientLogos();
    await seedTestimonials();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });
