import express from 'express';
import { nanoid } from 'nanoid';

const idLength = 8;
const router = express.Router();

/***
 * List all pusers
 */
router.get("/", (req, res) => {	
	const { users } = req.app.db.data;
	res.send(users);
});

/***
 * Get user by id
 */
router.get("/:id", (req, res) => {
	res.send(
		req.app.db.data.users.find( user => user.id === parseInt(req.params.id))
	);
});

/***
 * Test route for registration
 */
router.get("/register/:email/:password", async (req, res) => {
	if(req.app.db.data.users.find( user => user.email === req.params.email)) {
		res.send(`A user with ${req.params.email} is already registered`);
	}

	const users = [...req.app.db.data.users, {  id: nanoid(idLength), token: nanoid(30), ...req.params } ];
	req.app.db.data.users = users;
	await req.app.db.write(users);	
	res.json({status:true})
});


/***
 * Register User
 */
router.post("/register", async (req, res) => {
	console.log(req.body);
	if(req.app.db.data.users.find( user => user.email === req.body.email)) {		
		return res.status(500).json({
			status: false,
			message: `A user with ${req.body.email} is already registered`
		});
	} 

	const users = [...req.app.db.data.users, {  id: nanoid(idLength), token: nanoid(30), ...req.body } ];
	req.app.db.data.users = users;
	await req.app.db.write(users);	
	res.json({
		status: true,
		email: req.body.email
	});		
});

/***
 * Login User
 */
router.post("/login", (req, res) => {
	console.log(req.body);
	const { email, password } = req.body;		
	const loggedInUser = req.app.db.data.users.find( user => user.email === email && user.password === password);
	console.log(loggedInUser);
	if(!loggedInUser) {
		return res.status(500).json({
			status: false,
			message: `Invalid Username or Password`
		});
	} 

	// remove password key or any other from the user object
	const user = Object.keys(loggedInUser).reduce((object, key) => { 
		if (key !== "password") { 
			object[key] = loggedInUser[key]  }
  			return object
		}, {}
	);	

	res.json({
		status: true,
		user
	});	
});


export default router;
