import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

async function main() {
  const date = new Date();

  const data = await client.assignment.create({
    data: {
      assignToId: '63ca1a6418b83fae53e0b1b3',
      lessonId: '643d789c896f7b9c7977c242',
      assignDate: date,
    },
  });
}

main()
  .then(async () => {
    await client.$disconnect();
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
