import { betterAuth } from "better-auth"; 
import { mongodbAdapter } from "better-auth/adapters/mongodb"; 
import { MongoClient } from "mongodb";

const e = process.env;
if (!e.MONGODB_URI) throw new Error("MONGODB_URI .env এ নেই"); 
if (!e.BETTER_AUTH_SECRET) throw new Error("BETTER_AUTH_SECRET .env এ নেই");

const g = globalThis; 
const client = g._mongo || (g._mongo = new MongoClient(e.MONGODB_URI));

const url = e.BETTER_AUTH_URL || "http://localhost:3000"; 
const social = {};

if (e.GOOGLE_CLIENT_ID && e.GOOGLE_CLIENT_SECRET) social.google = { 
    clientId: e.GOOGLE_CLIENT_ID, 
    clientSecret: e.GOOGLE_CLIENT_SECRET 
};

if (e.GITHUB_CLIENT_ID && e.GITHUB_CLIENT_SECRET) social.github = { 
    clientId: e.GITHUB_CLIENT_ID, 
    clientSecret: e.GITHUB_CLIENT_SECRET 
};

export const auth = betterAuth({
    baseURL: url, 
    secret: e.BETTER_AUTH_SECRET, 
    trustedOrigins: [url, "http://localhost:3000", "http://localhost:3001"],
    database:mongodbAdapter(client.db()), 
    emailAndPassword: { 
        enabled: true, 
        autoSignIn: false, 
        minPasswordLength: 8 }, 
        socialProviders: social
});
