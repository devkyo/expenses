
import { PrismaClient } from '@prisma/client';
import moment from 'moment-timezone';

const prisma = new PrismaClient()


export async function GET(req) {

  try {
    const getItems = await prisma.item.findMany({
      include: {
        category: true
      },
      orderBy: {
        id: 'desc'
      }
    })

    const items = getItems.map(item => ({
      ...item,
      price: parseFloat(item.price)  // Convertir el precio a número
    }));
    

    return new Response(
      JSON.stringify({ items }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "error de", error: error.message }), { status: 500 }
    )
  } finally {
    await prisma.$disconnect(); // Desconecta Prisma después de la operación
  }
}


export async function POST(req) {

  try {
    const dateTime = moment.tz('America/Lima').toDate();
    const { name, categoryId, price } = await req.json()

    const item = await prisma.item.create({
      data: {
        name,
        price: parseFloat(price),
        categoryId,
        created_at: dateTime
      },
      include: {
        category: true
      }
    })

    const processItem = {
      ...item,
      price: parseFloat(item.price) // Asegura que el campo 'price' sea un número flotante
    };
    

    return new Response(
      JSON.stringify({ message: "Item created successfully", item: processItem }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
  } catch (err) {
    return new Response(
      JSON.stringify({ message: "Error al crear item", error: err.message }, {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      })
    )
  } finally {
    await prisma.$disconnect()
  }
}



export async function DELETE(req) {
  try {
    const { id } = await req.json()
    const item = await prisma.item.delete({
      where: {
        id
      }
    })

    return new Response(JSON.stringify({ message: "Item deleted", item }), {
      status: 201,
      headers: {
        "Content-Type": "application/json"
      }
    });

  } catch (err) {
    return new Response(JSON.stringify({ message: "Error item deleted", error: err.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    })
  } finally {
    await prisma.$disconnect(); // Desconecta Prisma después de la operación
  }
}
