# ENVITED-X Data Space

## Resources

- [Miro Board](https://miro.com/app/board/uXjVNeZRbEw=/)

## Prerequisites

- Node.js >= 18.20.2, [Installation instructions](https://github.com/nvm-sh/nvm)
- Postgres DB, for example using [Docker](https://hub.docker.com/_/postgres) automatically downloaded later

## Installation

### Clone the repository

```bash
git clone git@github.com:ASCS-eV/envited-x-data-space.git
```

### Update repository

```bash
git fetch origin # get new branches
git status # check branch
git pull # update current branch
```

From the root directory run:

```bash
nvm ls # show installed node versions
nvm use VERSION # >= 18.20.2
node --version
npm install --legacy-peer-deps # due to dependencies
```

### Database Connection

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

If you have completed the setup of the docker container before you can start it and check if the envited container is running:

```bash
docker start envited
docker container ls
```

### Setting up the environment

In `apps/envited.ascs.digital` rename `.env.example` to `.env.development` and fill out the required values.

## Test the app

```bash
npx nx test envited.ascs.digital —watch
```

## Start the app

To start the development server run:

```bash
npx nx serve envited.ascs.digital
```

Open your browser and navigate to http://localhost:4200/

Happy coding!
