import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { User } from './models/user.models.js';
import { setTimeout } from 'timers/promises';
import Config from './config.js';
const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
try {
    await mongoose.connect(`${Config.MONGO_URI}`);
    console.log('Connected to mongoose');
    app.listen(Config.PORT, ()=>console.log(`Server running on port ${Config.PORT}`));
    app.use((req, res, next)=>{
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} ${req.ip}`);
        next();
    });
    app.get('/', async (_req, res)=>{
        const users = await User.find();
        await setTimeout(2000, 'result');
        res.json(users);
    });
    app.post('/', async (_req, res)=>{
        const newUser = new User({
            name: 'Jane Doe'
        });
        await newUser.save();
        res.json(newUser);
    });
    app.delete('/', async (_req, res)=>{
        await User.deleteMany();
        res.send('Deleted all users');
    });
} catch (error) {
    console.error('Error connecting to database: ', error);
} finally{
    console.log('Finally');
}

//# sourceMappingURL=index.js.map