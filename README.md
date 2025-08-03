# weather-app-fidenz
Weather app assignment given by Fidenz

## Setup
1. Create the `.env.local` file like this in project root directory
    ```
    OPENWEATHERMAP_API_KEY=
    OPENWEATHERMAP_BASE_URL=http://api.openweathermap.org/data/2.5
    
    AUTH0_SECRET=
    AUTH0_BASE_URL=http://localhost:3000
    AUTH0_ISSUER_BASE_URL=
    AUTH0_CLIENT_ID=
    AUTH0_CLIENT_SECRET=
   ```
2. Install packages by running `npm install` command
3. Spin up the dev server by running `npm run dev` command

## Deployed application
Application is deployed on Vercel and find it [here](https://weather-app-fidenz.vercel.app/)

## Important!
Check the branches to find the end of part 1 of the assignment and an alternative way to handle caching in the server. This caching strategy was abandoned as it is not very suitable for production environments.
   1. With huge traffic deployed container memory can accumulate and will make the app crash or slower.
   2. Not shared among instances (Vercel can scale the application if more traffic comes)

Current caching is handled with Next.js built-in caching mechanisms in fetch
