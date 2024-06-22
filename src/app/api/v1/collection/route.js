import prisma from "@/services/prisma"

export async function POST(request) {
    const { anime_mal_id, user_email, anime_image, anime_title } = await request.json()
    const data = { anime_mal_id, user_email, anime_image, anime_title }

    try {
        const createCollection = await prisma.collection.create({ data })
        return new Response(JSON.stringify({ status: 200, isCreated: true }), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({ status: 500, isCreated: false }), { status: 500 })
    }
}

export async function DELETE(request) {
    const { anime_mal_id, user_email } = await request.json()

    try {
        const deleteCollection = await prisma.collection.deleteMany({
            where: { anime_mal_id, user_email }
        })
        return new Response(JSON.stringify({ status: 200, isDeleted: true }), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({ status: 500, isDeleted: false }), { status: 500 })
    }
}

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const anime_mal_id = searchParams.get('anime_mal_id')
    const user_email = searchParams.get('user_email')

    try {
        const collectionItem = await prisma.collection.findFirst({
            where: { anime_mal_id, user_email }
        })
        const isInCollection = !!collectionItem
        return new Response(JSON.stringify({ status: 200, isInCollection }), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({ status: 500, isInCollection: false }), { status: 500 })
    }
}
