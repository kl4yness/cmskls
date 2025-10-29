const { PrismaClient } = require('./src/app/generated/prisma/client')

async function debug() {
  const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error']
  })

  try {
    console.log('=== DATABASE_URL ===')
    console.log(process.env.DATABASE_URL)
    
    console.log('=== Пробуем выполнить запрос ===')
    const result = await prisma.$queryRaw`SELECT current_database(), current_user, version()`
    console.log('✅ Подключение работает:', result)

    console.log('=== Проверяем таблицы ===')
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `
    console.log('✅ Таблицы в БД:', tables)

    console.log('=== Пробуем найти пользователя ===')
    const users = await prisma.user.findMany()
    console.log('✅ Пользователи:', users)

  } catch (error) {
    console.log('❌ ОШИБКА:', error.message)
    console.log('Полная ошибка:', error)
  } finally {
    await prisma.$disconnect()
  }
}

debug()