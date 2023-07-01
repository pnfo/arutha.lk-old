# Arutha.lk Sinhala Dictionay

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev
```

## Production

Build the application for production and deploy

* `npm run build`
* copy `.output` folder to production server
* run `node server/index.mjs`
* point the nginx server conf to the `127.0.0.1:3000`
* note: I had to upgrade the node version to 16.20.1 or above. Otherwise had an error
* `pm2 start server/index.mjs --name arutha-lk-server`
* `pm2 save` (save after changing any process parameters)

Locally preview production build:

```bash
# npm
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
