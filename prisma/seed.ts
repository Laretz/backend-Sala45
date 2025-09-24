import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface RoomData {
  name: string;
  capacity: number;
  location: string;
}

async function main(): Promise<void> {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Criar as 3 salas fixas
  const rooms: RoomData[] = [
    {
      name: 'Sala Executiva',
      capacity: 8,
      location: 'Andar 10 - Ala Norte'
    },
    {
      name: 'Sala de Reuniões',
      capacity: 12,
      location: 'Andar 5 - Ala Sul'
    },
    {
      name: 'Auditório',
      capacity: 50,
      location: 'Térreo - Ala Central'
    }
  ];

  console.log('📍 Criando salas...');
  
  for (const roomData of rooms) {
    const existingRoom = await prisma.room.findUnique({
      where: { name: roomData.name }
    });

    if (!existingRoom) {
      const room = await prisma.room.create({
        data: roomData
      });
      console.log(`✅ Sala criada: ${room.name} (ID: ${room.id})`);
    } else {
      console.log(`⚠️  Sala já existe: ${roomData.name}`);
    }
  }

  console.log('🎉 Seed concluído com sucesso!');
}

main()
  .catch((e: Error) => {
    console.error('❌ Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });