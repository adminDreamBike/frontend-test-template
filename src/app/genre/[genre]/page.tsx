import GamesGrid from "@/components/GamesGrid/GamesGrid"
import { getGames } from "@/lib/api/games"

export default async function Page({ params }) {
    const { genre } = params

    const response = await getGames({genre})
   

    return <GamesGrid data={response} filter={genre} />
}