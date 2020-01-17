const axios = require('axios');
const Dev = require('../models/Dev');

const parseStringAsArray = require('../Utils/parseStringAsArray')

module.exports = {

    async index(req, res){
        const devs = await Dev.find();
        return res.json(devs);
    },

    async store(req, res) {
        
        const {github_username, techs, latitude, longitude} = req.body;
        
        let dev = await Dev.findOne({github_username});

        if (!dev) {

            const hg_response = await axios.get(`https://api.github.com/users/${github_username}`);
            
            let {name, login, avatar_url, bio} = hg_response.data; 
            name = name || login;

            const techsArray = parseStringAsArray(techs);
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }
            dev = await Dev.create({
                name,
                github_username,
                bio,
                avatar_url,
                techs: techsArray,
                location
            });
        }
        return res.json(dev);

    },

    async update(req, res){

        //
        let dev = await Dev.findOne({github_username: req.params.github_username});

        const {name, bio, avatar_url, techs, latitude, longitude} = req.body;
        
        dev.name = name || dev.name;
        dev.bio = bio || dev.bio;
        dev.avatar_url = avatar_url || dev.avatar_url;      
        dev.techs = (techs ? parseStringAsArray(techs) : null) || dev.techs
        dev.location = {
            type: 'Point',
            coordinates: [longitude || dev.location.coordinates[0], latitude || dev.location.coordinates[1]]
        }
        
        dev = await dev.save();

        return res.json(dev);
    },

    async destroy(req, res){
        let dev = await Dev.deleteOne({github_username: req.params.github_username});
        return res.json(dev);
    },
}