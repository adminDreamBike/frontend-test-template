import GamesGrid from "@/components/GamesGrid/GamesGrid"
import { getGames } from "@/lib/api/games"

/* eslint-disable  @typescript-eslint/no-explicit-any */
export default async function Page({ params }: {params: any}) {
    const { genre } = params

    const response = await getGames({genre})
   

    return <GamesGrid data={response} filter={genre} />
}