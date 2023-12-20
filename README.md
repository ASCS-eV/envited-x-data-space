# ENVITED Marketplace

## Resources
* [Miro Board](https://miro.com/app/board/uXjVNeZRbEw=/)

## Start the app

To start the development server run `npx nx serve envited.ascs.digital`. Open your browser and navigate to http://localhost:4200/. Happy coding!

#### Installing dependencies

From the root directory run:

```bash
nvm ls # show installed node versions
nvm use VERSION # >= 18.18
node --version
npm install
```

#### Database Connection

> The local database schema may change so you have to make sure to clean up by removing existing container and images just to be sure:

```bash
docker container ls --all
docker container remove envited
docker image ls
docker image remove postgres
```

At first you need to create a docker container. The only thing we need is the individual connection string of a running postgres db.
For example by using Docker, when running the Docker instance with the following example values:

```bash
docker run --name envited -p 5436:5432 \
-e POSTGRES_DB=envited \
-e POSTGRES_USER=admin \
-e POSTGRES_PASSWORD=123456 \
postgres
```

The connection string will in this case look like this:

```text
postgres://admin:123456@localhost:5436/envited
```

If you have completed the setup of the docker container before you can start it and check if the demim container is running:

```bash
docker start envited
docker container ls
```

#### Setting up the environment

In `apps/envited.ascs.digital` rename `.env.example` to `.env` and replace the `POSTGRES_URL` with your connection string.
Leave the `PLATFORM` constant to be `node`

### Setting up the DB

When the DB connection is set up and working, the DB can be created and seeded.

#### Creating the migration

We're using migrations to manage the DB. To setup the initial DB we first have to create it:

```bash
npx nx db:generate envited.ascs.digital
```

Then run the migration

```bash
npx nx db:migrate envited.ascs.digital
```
