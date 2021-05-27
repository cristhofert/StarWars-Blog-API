import { Request, Response } from 'express'
import { getRepository } from 'typeorm'  // getRepository"  traer una tabla de la base de datos asociada al objeto
import { User } from './entities/User'
import { Exception } from './utils'
import { Planet } from './entities/Planet'
import { Character } from './entities/Character'
import { Favorite } from './entities/Favorite'
import jwt from 'jsonwebtoken'

export const createUser = async (req: Request, res:Response): Promise<Response> =>{

	// important validations to avoid ambiguos errors, the client needs to understand what went wrong
	if(!req.body.user_name) throw new Exception("Please provide a user_name")
	if(!req.body.first_name) throw new Exception("Please provide a first_name")
	if(!req.body.last_name) throw new Exception("Please provide a last_name")
	if(!req.body.email) throw new Exception("Please provide an email")
	if(!req.body.password) throw new Exception("Please provide a password")

	const userRepo = getRepository(User)
	// fetch for any user with this email
	const user = await userRepo.findOne({ where: {email: req.body.email }})
	if(user) throw new Exception("Users already exists with this email")

	const newUser = getRepository(User).create(req.body);  //Creo un usuario
	const results = await getRepository(User).save(newUser); //Grabo el nuevo usuario 
	return res.json(results);
}

export const getUsers = async (req: Request, res: Response): Promise<Response> =>{
		const users = await getRepository(User).find();
		return res.json(users);
}

export const getPlanets = async (req: Request, res: Response): Promise<Response> =>{
		const planets = await getRepository(Planet).find();
		return res.json(planets);
}

export const getCharacters = async (req: Request, res: Response): Promise<Response> =>{
		const characters = await getRepository(Character).find();
		return res.json(characters);
}

export const getPlanet = async (req: Request, res: Response): Promise<Response> =>{
    const planets = await getRepository(Planet).findOne(req.params.id)
    return res.json(planets);
}

export const getCharacter = async (req: Request, res: Response): Promise<Response> =>{
    const planets = await getRepository(Character).findOne(req.params.id)
    return res.json(planets);
}

export const getFavorites = async (req: Request, res: Response): Promise<Response> =>{
    const token = req.user as IToken
    const favorites = await getRepository(Favorite).find({ where: {user: token.user },relations: ["user", "planet", "character"]})
    return res.json(favorites);
}

export const createCharacters = async (req: Request, res: Response): Promise<Response> =>{
    let results= []
    for (let index = 0; index < req.body.length; index++) {
        
    if(!req.body[index].name) results.push(`Please provide a name ${index}`)
	if(!req.body[index].height) results.push(`Please provide some height ${index}`)
	if(!req.body[index].mass) results.push(`Please provide some mass ${index}`)
    if(!req.body[index].hair_color) results.push(`Please provide some hair_color ${index}`)
    if(!req.body[index].skin_color)results.push(`Please provide some skin_color ${index}`)
    if(!req.body[index].eye_color) results.push(`Please provide some eye_color ${index}`)
    if(!req.body[index].birth_year) results.push(`Please provide the birth_year ${index}`)
    if(!req.body[index].gender) results.push(`Please provide some gender ${index}`)
    if(!req.body[index].homeworld) results.push(`Please provide a homeworld ${index}`)
    if(!req.body[index].url) results.push(`Please provide an url ${index}`)

    const charactersRepo = getRepository(Character)
	const character = await charactersRepo.findOne({ where: {name: req.body[index].name }})
    if(character)results.push("That character alrady exists")
    else if (!req.body[index].name||!req.body[index].height||!req.body[index].mass||!req.body[index].hair_color||!req.body[index].skin_color||!req.body[index].eye_color||!req.body[index].birth_year||!req.body[index].gender||!req.body[index].homeworld||!req.body[index].url)
    {
        results.push(`that character ${req.body[index].name} wasnt save`)
    } else {const newCharacter = getRepository(Character).create(req.body[index]);  
	results.push(await getRepository(Character).save(newCharacter))} 

    }
	return res.json(results);
}

export const createPlanets = async (req: Request, res: Response): Promise<Response> =>{
    let results= []
    for (let index = 0; index < req.body.length; index++) {
        
    if(!req.body[index].name) results.push(`Please provide a name ${index}`)
	if(!req.body[index].diameter) results.push(`Please provide some diameter ${index}`)
	if(!req.body[index].rotation_period) results.push(`Please provide some the rotation period ${index}`)
    if(!req.body[index].orbital_period) results.push(`Please provide the orbital period ${index}`)
    if(!req.body[index].gravity) results.push(`Please provide the gravity ${index}`)
    if(!req.body[index].population) results.push(`Please provide the population ${index}`)
    if(!req.body[index].climate) results.push(`Please provide the climate ${index}`)
    if(!req.body[index].terrain) results.push(`Please provide the terrain ${index}`)
    if(!req.body[index].surface_water) results.push(`Please provide surface_water ${index}`)
    if(!req.body[index].url) results.push(`Please provide an url ${index}`)

    const planetsRepo = getRepository(Planet)
	const planet = await planetsRepo.findOne({ where: {name: req.body[index].name }})
    if(planet){
        results.push("That planet alrady exists")}
    else if (!req.body[index].name||!req.body[index].diameter||!req.body[index].rotation_period||!req.body[index].orbital_period||!req.body[index].gravity||!req.body[index].population||!req.body[index].climate||!req.body[index].terrain||!req.body[index].surface_water||!req.body[index].url)
    {
        results.push(`that planet ${req.body[index].name} wasnt save`)
    } else {
        const newPlanet = getRepository(Planet).create(req.body[index]); 
	results.push(await getRepository(Planet).save(newPlanet))} 
    
       
    }
    
	return res.json(results);
}

//controlador para el logueo
export const login = async (req: Request, res: Response): Promise<Response> =>{
		
	if(!req.body.email) throw new Exception("Please specify an email on your request body", 400)
	if(!req.body.password) throw new Exception("Please specify a password on your request body", 400)

	const userRepo = await getRepository(User)

	// We need to validate that a user with this email and password exists in the DB
	const user = await userRepo.findOne({ where: { email: req.body.email, password: req.body.password }})
	if(!user) throw new Exception("Invalid email or password", 401)

	// this is the most important line in this function, it create a JWT token
	const token = jwt.sign({ user }, process.env.JWT_KEY as string, { expiresIn: 24 * 60 * 60 });
	
	// return the user and the recently created token to the client
	return res.json({ user, token });
}

interface IToken{
    user:User,
    iat:number,
    exp:number
}

export const addPlanetFavorite = async (req: Request, res: Response): Promise<Response> =>{
        const token = req.user as IToken
        let favorite = new Favorite()
        favorite.user=token.user
        const planeta = await getRepository(Planet).findOne(req.params.id);
        favorite.planet=planeta as Planet

	    const results = await getRepository(Favorite).save(favorite); 
	    return res.json(results);
}

export const addCharacterFavorite = async (req: Request, res: Response): Promise<Response> =>{
        const token = req.user as IToken
        let favorite = new Favorite()
        favorite.user=token.user
        const character = await getRepository(Character).findOne(req.params.id);
        favorite.character=character as Character

	    const results = await getRepository(Favorite).save(favorite); 
	    return res.json(results);
}

export const deleteFavoritePlanet = async (req: Request, res: Response): Promise<Response> =>{
    const token = req.user as IToken
    const planet = await getRepository(Planet).findOne(req.params.id);
    const user = await getRepository(User).findOne(token.user) 
    const planetFavorite = await getRepository(Favorite).findOne({where:{planet:planet, user: user}});
    if(!planetFavorite) throw new Exception("No tenes ese planeta en Favorites")
    const results = await getRepository(Favorite).delete({planet:planet})
    return res.json(results);
}

export const deleteFavoriteCharacter = async (req: Request, res: Response): Promise<Response> =>{
    const token = req.user as IToken
    const character = await getRepository(Character).findOne(req.params.id);
    const user = await getRepository(User).findOne(token.user) 
    const characterFavorite = await getRepository(Favorite).findOne({where:{character:character, user: user}});
    if(!characterFavorite) throw new Exception("No tienes ese character en Favorites")
    const results = await getRepository(Favorite).delete({character:character})
    return res.json(results);
}