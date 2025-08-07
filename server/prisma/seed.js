// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt'); // For hashing password

async function main() {
  // ✅ Seed subjects
  await prisma.subject.createMany({
    data: [
      { name: 'Mathematics' },
      { name: 'English Language' },
      { name: 'Physics' },
      { name: 'Biology' },
      { name: 'Chemistry' },
      { name: 'Computer Science' }
    ],
    skipDuplicates: true
  });
  console.log('✅ Subjects seeded');

  // ✅ Seed admin user
  const hashedPassword = await bcrypt.hash('admin123', 10); // default password

  await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: hashedPassword,
      role: 'admin'
    }
  });
  console.log('✅ Admin user seeded (username: admin, password: admin123)');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
