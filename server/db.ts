// Database configuration with mock fallback for development
import * as schema from "@shared/schema";

// In development without DATABASE_URL, use mock implementation
if (!process.env.DATABASE_URL && process.env.NODE_ENV === 'development') {
  console.log('🔄 Using mock database for development...');
  const { db } = await import('./db-mock.js');
  export { db };
} else {
  // Production database implementation
  const { Pool, neonConfig } = await import('@neondatabase/serverless');
  const { drizzle } = await import('drizzle-orm/neon-serverless');
  const ws = await import("ws");
  
  neonConfig.webSocketConstructor = ws.default;

  if (!process.env.DATABASE_URL) {
    throw new Error(
      "DATABASE_URL must be set. Did you forget to provision a database?",
    );
  }

  export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  export const db = drizzle({ client: pool, schema });
}