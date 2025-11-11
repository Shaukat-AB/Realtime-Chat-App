import User from '../models/user.model.js';
import { connectDb } from './../lib/db/db.js';
import { config } from 'dotenv';

config();

const seedUsers = [
  {
    email: 'jane@gmail.com',
    fullname: 'Jane Doe',
    password: '$2b$10$HYSaNqjycwxg/ijVaAxMOu1NXQrn19BmkGRpoCvLPN1tGWTtDQcP6',
    avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
  },
  {
    email: 'emily.smith2@example.com',
    fullname: 'Emily Smith',
    password: 'password123',
    avatar: 'https://randomuser.me/api/portraits/women/34.jpg',
  },
  {
    email: 'lisa.jones3@example.com',
    fullname: 'Lisa Jones',
    password: 'password123',
    avatar: 'https://randomuser.me/api/portraits/women/56.jpg',
  },
  {
    email: 'john.doe1@example.com',
    fullname: 'John Doe',
    password: 'password123',
    avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
  },
  {
    email: 'michael.smith2@example.com',
    fullname: 'Michael Smith',
    password: 'password123',
    avatar: 'https://randomuser.me/api/portraits/men/23.jpg',
  },
  {
    email: 'susan.brown4@example.com',
    fullname: 'Susan Brown',
    password: 'password123',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    email: 'karen.wilson5@example.com',
    fullname: 'Karen Wilson',
    password: 'password123',
    avatar: 'https://randomuser.me/api/portraits/women/89.jpg',
  },
  {
    email: 'david.jones3@example.com',
    fullname: 'David Jones',
    password: 'password123',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
  },
  {
    email: 'robert.brown4@example.com',
    fullname: 'Robert Brown',
    password: 'password123',
    avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
  },
  {
    email: 'james.wilson5@example.com',
    fullname: 'James Wilson',
    password: 'password123',
    avatar: 'https://randomuser.me/api/portraits/men/78.jpg',
  },
];

const seedDb = async () => {
  try {
    await connectDb();
    await User.insertMany(seedUsers);
    console.log('Db seeded Users');
  } catch (err) {
    console.err('Error Db seed Users: ', err);
  }
};

const deleteUsers = async () => {
  try {
    await connectDb();
    await User.deleteMany({});
    console.log('Db deleted Users');
  } catch (err) {
    console.err('Error Db delete Users: ', err);
  }
};

seedDb();
