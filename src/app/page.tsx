import GamesGrid from "@/components/GamesGrid/GamesGrid";
import { getGames } from "@/lib/api/games";
import { Text } from "@/components/ui/text";

export const dynamic = 'force-dynamic'


async function getInitialGames() {  
  const response = await getGames({})
  return response
}

export default async function Home() {
  const initialGames = await getInitialGames()

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 place-items-center">
        <Text textStyle="h2" className="text-3xl font-bold mb-8 px-8">
          TOP SELLERS
        </Text>
        <GamesGrid data={initialGames} />
      </div>
    </main>
  );
}
