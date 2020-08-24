// main imports
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
require('dotenv').config();

const JWKSURI = process.env.JWKSURI;
const AUDIENCE = process.env.AUDIENCE;
const ISSUER = process.env.ISSUER;

// database
const {startDatabase} = require('./database/mongo');
const {insertAd, getAds, updateAd, deleteAd} = require('./database/ads');


// defining the express app
const app = express();

// temporary database
const ads = [
    {title: 'Hello, world (again)'}
];

// project configurations
app.use(helmet()) // Helmet
app.use(bodyParser.json()) // Body Parser
app.use(cors()) // CORS Headers
app.use(morgan('combined')) // Morgan

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: JWKSURI
    }),
    audience: AUDIENCE,
    issuer: ISSUER,
    algorithms: ['RS256']
})

app.get('/', async (req, res) => {
    const allAds = await getAds();
    res.json(allAds);
});

app.use(checkJwt);

app.post('/', async (req, res) => {
    const newAd = req.body;
    await insertAd(newAd);
    res.json({message: 'New Ad Inserted.'});
});

app.delete('/:id', async (req, res) => {
    await deleteAd(req.params.id);
    res.json({message: 'Ad removed'})
});

app.put('/:id', async (req, res) => {
    const updatedAd = req.body;
    await updateAd(req.params.id, updatedAd);
    res.json({'message': 'Ad updated.'});
});

startDatabase();

app.listen(3001, () => {
  console.log('Listening on port 3001');
});