import * as Express from "express";
import Hero from "../models/hero";
import fs from 'fs';

const findAll = async (req: Express.Request, res: Express.Response) => {
        //reading file and fetching all heroes
        let heroes: Hero[] = JSON.parse(fs.readFileSync("src/data/heroes.json", 'utf8'));

        //sending the response
        if (heroes) {
                res.status(200).send(heroes);
        } else {
                res.status(404).send('Heroes not found');
        }
}

const findById = async (req: Express.Request, res: Express.Response) => {
        //reading the file and fetching all heroes
        let heroes: Hero[] = JSON.parse(fs.readFileSync("src/data/heroes.json", 'utf8'));
        //finding the hero for given id
        let hero: Hero = heroes.find(hero => hero.id == parseInt(req.params.id))

        //sending the response
        if (hero) {
                res.status(200).send(hero);
        } else {
                res.status(404).send('Hero not found');
        }
}

export default {
        findAll,
        findById
}