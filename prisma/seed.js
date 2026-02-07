const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  const categories = [
    { name: 'Anillos' },
    { name: 'Collares' },
    { name: 'Pulseras' },
    { name: 'Pendientes' },
    { name: 'Sahumerios' },
  ]

  console.log('🌱 Comenzando la siembra...')

  for (const cat of categories) {
    const category = await prisma.category.upsert({
      where: { name: cat.name },
      update: {},
      create: {
        name: cat.name,
      },
    })
    console.log(`Created category with id: ${category.id}`)
  }
  
  console.log('🌳 Siembra terminada.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })