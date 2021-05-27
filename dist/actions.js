"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.deleteFavoriteCharacter = exports.deleteFavoritePlanet = exports.addCharacterFavorite = exports.addPlanetFavorite = exports.login = exports.createPlanets = exports.createCharacters = exports.getFavorites = exports.getCharacter = exports.getPlanet = exports.getCharacters = exports.getPlanets = exports.getUsers = exports.createUser = void 0;
var typeorm_1 = require("typeorm"); // getRepository"  traer una tabla de la base de datos asociada al objeto
var User_1 = require("./entities/User");
var utils_1 = require("./utils");
var Planet_1 = require("./entities/Planet");
var Character_1 = require("./entities/Character");
var Favorite_1 = require("./entities/Favorite");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepo, user, newUser, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // important validations to avoid ambiguos errors, the client needs to understand what went wrong
                if (!req.body.user_name)
                    throw new utils_1.Exception("Please provide a user_name");
                if (!req.body.first_name)
                    throw new utils_1.Exception("Please provide a first_name");
                if (!req.body.last_name)
                    throw new utils_1.Exception("Please provide a last_name");
                if (!req.body.email)
                    throw new utils_1.Exception("Please provide an email");
                if (!req.body.password)
                    throw new utils_1.Exception("Please provide a password");
                userRepo = typeorm_1.getRepository(User_1.User);
                return [4 /*yield*/, userRepo.findOne({ where: { email: req.body.email } })];
            case 1:
                user = _a.sent();
                if (user)
                    throw new utils_1.Exception("Users already exists with this email");
                newUser = typeorm_1.getRepository(User_1.User).create(req.body);
                return [4 /*yield*/, typeorm_1.getRepository(User_1.User).save(newUser)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.createUser = createUser;
var getUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(User_1.User).find()];
            case 1:
                users = _a.sent();
                return [2 /*return*/, res.json(users)];
        }
    });
}); };
exports.getUsers = getUsers;
var getPlanets = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var planets;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Planet_1.Planet).find()];
            case 1:
                planets = _a.sent();
                return [2 /*return*/, res.json(planets)];
        }
    });
}); };
exports.getPlanets = getPlanets;
var getCharacters = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var characters;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Character_1.Character).find()];
            case 1:
                characters = _a.sent();
                return [2 /*return*/, res.json(characters)];
        }
    });
}); };
exports.getCharacters = getCharacters;
var getPlanet = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var planets;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Planet_1.Planet).findOne(req.params.id)];
            case 1:
                planets = _a.sent();
                return [2 /*return*/, res.json(planets)];
        }
    });
}); };
exports.getPlanet = getPlanet;
var getCharacter = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var planets;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Character_1.Character).findOne(req.params.id)];
            case 1:
                planets = _a.sent();
                return [2 /*return*/, res.json(planets)];
        }
    });
}); };
exports.getCharacter = getCharacter;
var getFavorites = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, favorites;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = req.user;
                return [4 /*yield*/, typeorm_1.getRepository(Favorite_1.Favorite).find({ where: { user: token.user }, relations: ["user", "planet", "character"] })];
            case 1:
                favorites = _a.sent();
                return [2 /*return*/, res.json(favorites)];
        }
    });
}); };
exports.getFavorites = getFavorites;
var createCharacters = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var results, index, charactersRepo, character, newCharacter, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                results = [];
                index = 0;
                _c.label = 1;
            case 1:
                if (!(index < req.body.length)) return [3 /*break*/, 7];
                if (!req.body[index].name)
                    results.push("Please provide a name " + index);
                if (!req.body[index].height)
                    results.push("Please provide some height " + index);
                if (!req.body[index].mass)
                    results.push("Please provide some mass " + index);
                if (!req.body[index].hair_color)
                    results.push("Please provide some hair_color " + index);
                if (!req.body[index].skin_color)
                    results.push("Please provide some skin_color " + index);
                if (!req.body[index].eye_color)
                    results.push("Please provide some eye_color " + index);
                if (!req.body[index].birth_year)
                    results.push("Please provide the birth_year " + index);
                if (!req.body[index].gender)
                    results.push("Please provide some gender " + index);
                if (!req.body[index].homeworld)
                    results.push("Please provide a homeworld " + index);
                if (!req.body[index].url)
                    results.push("Please provide an url " + index);
                charactersRepo = typeorm_1.getRepository(Character_1.Character);
                return [4 /*yield*/, charactersRepo.findOne({ where: { name: req.body[index].name } })];
            case 2:
                character = _c.sent();
                if (!character) return [3 /*break*/, 3];
                results.push("That character alrady exists");
                return [3 /*break*/, 6];
            case 3:
                if (!(!req.body[index].name || !req.body[index].height || !req.body[index].mass || !req.body[index].hair_color || !req.body[index].skin_color || !req.body[index].eye_color || !req.body[index].birth_year || !req.body[index].gender || !req.body[index].homeworld || !req.body[index].url)) return [3 /*break*/, 4];
                results.push("that character " + req.body[index].name + " wasnt save");
                return [3 /*break*/, 6];
            case 4:
                newCharacter = typeorm_1.getRepository(Character_1.Character).create(req.body[index]);
                _b = (_a = results).push;
                return [4 /*yield*/, typeorm_1.getRepository(Character_1.Character).save(newCharacter)];
            case 5:
                _b.apply(_a, [_c.sent()]);
                _c.label = 6;
            case 6:
                index++;
                return [3 /*break*/, 1];
            case 7: return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.createCharacters = createCharacters;
var createPlanets = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var results, index, planetsRepo, planet, newPlanet, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                results = [];
                index = 0;
                _c.label = 1;
            case 1:
                if (!(index < req.body.length)) return [3 /*break*/, 7];
                if (!req.body[index].name)
                    results.push("Please provide a name " + index);
                if (!req.body[index].diameter)
                    results.push("Please provide some diameter " + index);
                if (!req.body[index].rotation_period)
                    results.push("Please provide some the rotation period " + index);
                if (!req.body[index].orbital_period)
                    results.push("Please provide the orbital period " + index);
                if (!req.body[index].gravity)
                    results.push("Please provide the gravity " + index);
                if (!req.body[index].population)
                    results.push("Please provide the population " + index);
                if (!req.body[index].climate)
                    results.push("Please provide the climate " + index);
                if (!req.body[index].terrain)
                    results.push("Please provide the terrain " + index);
                if (!req.body[index].surface_water)
                    results.push("Please provide surface_water " + index);
                if (!req.body[index].url)
                    results.push("Please provide an url " + index);
                planetsRepo = typeorm_1.getRepository(Planet_1.Planet);
                return [4 /*yield*/, planetsRepo.findOne({ where: { name: req.body[index].name } })];
            case 2:
                planet = _c.sent();
                if (!planet) return [3 /*break*/, 3];
                results.push("That planet alrady exists");
                return [3 /*break*/, 6];
            case 3:
                if (!(!req.body[index].name || !req.body[index].diameter || !req.body[index].rotation_period || !req.body[index].orbital_period || !req.body[index].gravity || !req.body[index].population || !req.body[index].climate || !req.body[index].terrain || !req.body[index].surface_water || !req.body[index].url)) return [3 /*break*/, 4];
                results.push("that planet " + req.body[index].name + " wasnt save");
                return [3 /*break*/, 6];
            case 4:
                newPlanet = typeorm_1.getRepository(Planet_1.Planet).create(req.body[index]);
                _b = (_a = results).push;
                return [4 /*yield*/, typeorm_1.getRepository(Planet_1.Planet).save(newPlanet)];
            case 5:
                _b.apply(_a, [_c.sent()]);
                _c.label = 6;
            case 6:
                index++;
                return [3 /*break*/, 1];
            case 7: return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.createPlanets = createPlanets;
//controlador para el logueo
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepo, user, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.email)
                    throw new utils_1.Exception("Please specify an email on your request body", 400);
                if (!req.body.password)
                    throw new utils_1.Exception("Please specify a password on your request body", 400);
                return [4 /*yield*/, typeorm_1.getRepository(User_1.User)
                    // We need to validate that a user with this email and password exists in the DB
                ];
            case 1:
                userRepo = _a.sent();
                return [4 /*yield*/, userRepo.findOne({ where: { email: req.body.email, password: req.body.password } })];
            case 2:
                user = _a.sent();
                if (!user)
                    throw new utils_1.Exception("Invalid email or password", 401);
                token = jsonwebtoken_1["default"].sign({ user: user }, process.env.JWT_KEY, { expiresIn: 24 * 60 * 60 });
                // return the user and the recently created token to the client
                return [2 /*return*/, res.json({ user: user, token: token })];
        }
    });
}); };
exports.login = login;
var addPlanetFavorite = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, favorite, planeta, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = req.user;
                favorite = new Favorite_1.Favorite();
                favorite.user = token.user;
                return [4 /*yield*/, typeorm_1.getRepository(Planet_1.Planet).findOne(req.params.id)];
            case 1:
                planeta = _a.sent();
                favorite.planet = planeta;
                return [4 /*yield*/, typeorm_1.getRepository(Favorite_1.Favorite).save(favorite)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.addPlanetFavorite = addPlanetFavorite;
var addCharacterFavorite = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, favorite, character, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = req.user;
                favorite = new Favorite_1.Favorite();
                favorite.user = token.user;
                return [4 /*yield*/, typeorm_1.getRepository(Character_1.Character).findOne(req.params.id)];
            case 1:
                character = _a.sent();
                favorite.character = character;
                return [4 /*yield*/, typeorm_1.getRepository(Favorite_1.Favorite).save(favorite)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.addCharacterFavorite = addCharacterFavorite;
var deleteFavoritePlanet = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, planet, user, planetFavorite, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = req.user;
                return [4 /*yield*/, typeorm_1.getRepository(Planet_1.Planet).findOne(req.params.id)];
            case 1:
                planet = _a.sent();
                return [4 /*yield*/, typeorm_1.getRepository(User_1.User).findOne(token.user)];
            case 2:
                user = _a.sent();
                return [4 /*yield*/, typeorm_1.getRepository(Favorite_1.Favorite).findOne({ where: { planet: planet, user: user } })];
            case 3:
                planetFavorite = _a.sent();
                if (!planetFavorite)
                    throw new utils_1.Exception("No tenes ese planeta en Favorites");
                return [4 /*yield*/, typeorm_1.getRepository(Favorite_1.Favorite)["delete"]({ planet: planet })];
            case 4:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.deleteFavoritePlanet = deleteFavoritePlanet;
var deleteFavoriteCharacter = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, character, user, characterFavorite, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = req.user;
                return [4 /*yield*/, typeorm_1.getRepository(Character_1.Character).findOne(req.params.id)];
            case 1:
                character = _a.sent();
                return [4 /*yield*/, typeorm_1.getRepository(User_1.User).findOne(token.user)];
            case 2:
                user = _a.sent();
                return [4 /*yield*/, typeorm_1.getRepository(Favorite_1.Favorite).findOne({ where: { character: character, user: user } })];
            case 3:
                characterFavorite = _a.sent();
                if (!characterFavorite)
                    throw new utils_1.Exception("No tienes ese character en Favorites");
                return [4 /*yield*/, typeorm_1.getRepository(Favorite_1.Favorite)["delete"]({ character: character })];
            case 4:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.deleteFavoriteCharacter = deleteFavoriteCharacter;
