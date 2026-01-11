import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    console.log('Login attempt for:', email);
    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.log('User not found in DB');
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    console.log('User found. Comparing password...');
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match result:', isMatch);

    if (!isMatch) {
      console.log('Password mismatch');
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '30d',
    });

    res.json({
      id: user.id,
      email: user.email,
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
