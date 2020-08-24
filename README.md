AUTHORIZATION WITH AuthO
==========================

It's a simple Express API that let's users create, list, update and delete ads.

## Configuration
1. Add a .env file on the root folder with the following settings:
    * Auth0
        * JWKSURI=https://[DOMAIN]/.well-known/jwks.json
        * AUDIENCE=https://[AUDIENCE]
        * ISSUER=https://[DOMAIN]/
    * Database
    * MONGODB_URI=[MONGODB URI]

Note: you can find the Auth0 settings on the Auth0 Api's section in the Quick Start
tab of your API.