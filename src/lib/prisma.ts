import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
  pgPool: pg.Pool | undefined
}

const pool =
  globalForPrisma.pgPool ??
  new pg.Pool({
    connectionString: process.env.DATABASE_URL,
  })

pool.on('error', (err) => {
  console.error('Error imprevisto en cliente inactivo de PostgreSQL:', err)
})

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaPg(pool),
  })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
  globalForPrisma.pgPool = pool
}