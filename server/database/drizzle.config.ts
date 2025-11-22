import { defineConfig } from 'drizzle-kit'

export default defineConfig({
    dialect: 'sqlite',
    schema: './server/database/schema/**/*.{ts,js}',
    out: './server/database/migrations',
    dbCredentials: {
        url: './.data/tessera.sqlite',
    },
})