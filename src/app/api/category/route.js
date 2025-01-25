
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()


export async function GET(req) {

  try {
    const categories = await prisma.category.findMany()

    return new Response(
      JSON.stringify({ categories }), {
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
    const { name, color } = await req.json()
    console.log('post category');
    console.log(color);
    const category = await prisma.category.create({
      data: {
        name: name,
        color: color
      }
    })

    // console.log(category);
    return new Response(JSON.stringify({ message: "Category created", category }), {
      status: 201,
      headers: {
        "Content-Type": "application/json"
      }
    });

  } catch (err) {
    return new Response(JSON.stringify({ message: "Error al crear category", error: err.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    })
  } finally {
    await prisma.$disconnect(); // Desconecta Prisma después de la operación
  }
}