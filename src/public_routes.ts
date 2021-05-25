
/**
 * Public Routes are those API url's that anyone can request
 * whout having to be logged in, for example:
 * 
 * POST /user is the endpoint to create a new user or "sign up".
 * POST /token can be the endpoint to "log in" (generate a token)
 */
import { Router } from 'express';
import { safe } from './utils';
import * as actions from './actions';

const router = Router();

// signup route, creates a new user in the DB
router.post('/user', safe(actions.createUser));
router.get('/user', safe(actions.getUsers));

//planets
router.get('/planet', safe(actions.getPlanets));
router.get('/planet/:id', safe(actions.getPlanet));
//characters
router.get('/character', safe(actions.getCharacters));
router.get('/character/:id', safe(actions.getCharacter));
router.post('/character/:id', safe(actions.createCharacter));
//favorites [GET] /users/favorites
router.get('/users/:uid/favorites', safe(actions.getFavorites));
//[POST] /favorite/planet/<int:planet_id>y


export default router;
