
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
//login
router.post('/login',safe(actions.login))

// signup route, creates a new user in the DB
router.post('/user', safe(actions.createUser));

//planets
router.get('/planet', safe(actions.getPlanets));
router.get('/planet/:id', safe(actions.getPlanet));
router.post('/planet/', safe(actions.createPlanets));
//characters
router.get('/character', safe(actions.getCharacters));
router.get('/character/:id', safe(actions.getCharacter));
router.post('/character/', safe(actions.createCharacters));

export default router;
