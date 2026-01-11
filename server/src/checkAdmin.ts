
import User from './models/User';
import sequelize from './config/database';
import bcrypt from 'bcryptjs';

const checkAdmin = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected.');

    const admin = await User.findOne({ where: { email: 'admin@mediasoftbd.com' } });
    if (!admin) {
      console.log('Admin user NOT found!');
    } else {
      console.log('Admin user found.');
      console.log('Stored Password Hash:', admin.password);
      
      const isMatch = await bcrypt.compare('Mediasoft2026@#', admin.password);
      console.log('Password "Mediasoft2026@#" matches:', isMatch);
    }
    process.exit();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

checkAdmin();
