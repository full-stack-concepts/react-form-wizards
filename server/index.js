import express from "express";
import cors from 'cors';
import morgan from "morgan";
import { Low, JSONFile } from 'lowdb';
import userRouter from './users.js';
import { nanoid } from 'nanoid';



const adapter = new JSONFile("db.json");
const db = new Low(adapter);
db.data = ({ users: [
	{ 
		id: 1,
		role: 'admin',
		email: 'admin@example.com' ,
		password: '12345678',
		firstName: 'Admin',
		lastName: 'Adminstrator',
		token: nanoid(30) 
	},
	{
		id: 2,
		role: 'user',
		email: 'johndoe@example.com',
		password: '12345678',
		firstName: 'John',
		lastName: 'Doe',
		token: nanoid(30)
	}
]});
await db.write(db.data);

const PORT = process.env.PORT || 4000
const app = express();

app.db = db;
app.use(cors({origin: '*'}));
app.use(express.json());
app.use(morgan("dev"));
app.use("/users", userRouter);

const localRouter = express.Router();
localRouter.get("/", (req, res) => {		
	res.send('Only  /users/* routes are supported ');
});

app.use(localRouter);
app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));

