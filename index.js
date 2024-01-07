import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import path from 'path'
import { UserModel } from './modules/passwordMangerModel.js';
import { UserDetails } from './modules/userDetails.js';
import { MOGOURI } from './config/prod.js';
const __dirname = path.resolve();

const app = express();
app.use(express.json());

app.use(cors());


mongoose.connect(MOGOURI,{
  useNewUrlParser:true,
  useUnifiedTopology: true
})

mongoose.connection.on('connected',()=>{
  console.log('connected to mongo yeahhh')
})
mongoose.connection.on('error',(err)=>{
  console.log('error',err)
})

app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: error.message });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '1h' });
    res.status(200).json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/password/added/:id', async (req, res) => {
  try {
    const { userName, websiteName, websitePassword, color } = req.body;
    const user_id = req.params.id;
    const existingUser = await UserDetails.findOne({ websiteName });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists details' });
    }
    const newUser = new UserDetails({ userName, websiteName, websitePassword, userId: user_id, color });
    await newUser.save();
    res.status(201).json({ message: 'User added details successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/user/:id/details', async (req, res) => {
  try {
    const user_id = req.params.id;
    const userSpecificDetails = await UserDetails.find({ userId: user_id });

    if (!userSpecificDetails) {
      return res.status(404).json({ message: 'User details not found' });
    }

    res.status(200).json({ userSpecificDetails });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: error.message });
  }
});

app.delete('/user/:userId/password/:passwordId', async (req, res) => {
  try {
    const { userId, passwordId } = req.params;
    const userCheck = await UserDetails.findOne({ userId });

    if (!userCheck) {
      return res.status(404).json({ message: 'User not found' });
    }

    const deletedPassword = await UserDetails.findOneAndDelete({ _id: passwordId, userId });

    if (!deletedPassword) {
      return res.status(404).json({ message: 'Password not found for this user' });
    }

    res.status(200).json({ message: 'Password deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.get("/", (req, res) => {
  app.use(express.static(path.resolve(__dirname, "./clientSide", "build")));
  res.sendFile(path.resolve(__dirname, "./clientSide", "build", "index.html"));
  });

app.listen(process.env.PORT||5555, () => {
  console.log(`App running on port 5555`);
});

export default app;
