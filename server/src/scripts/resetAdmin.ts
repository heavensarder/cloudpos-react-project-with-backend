import sequelize from '../config/database';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

const resetAdmin = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected...');

    const email = 'admin@mediasoftbd.com';
    const password = 'Mediasoft2026@#';
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: { email, password: hashedPassword }
    });

    if (!created) {
      user.password = hashedPassword;
      await user.save();
      console.log('Admin password updated successfully.');
    } else {
      console.log('Admin user created successfully.');
    }
  } catch (error) {
    console.error('Error resetting admin:', error);
  } finally {
    await sequelize.close();
  }
};

resetAdmin();
