import bcrypt from 'bcryptjs';
import User from '../database/models/User';
import { Request, Response } from 'express';
import ConnectDB from '../database';

export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    await ConnectDB();
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    res.json({ userId: user._id, username: user.name });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    await ConnectDB();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.json({ userId: newUser._id, username: newUser.name });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
