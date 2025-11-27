import GamesGrid from "@/components/GamesGrid/GamesGrid";
import { getGames } from "@/lib/api/games";
import { Text } from "@/components/ui/text";
import { allGames, availableFilters, delay } from "@/utils/endpoint";

export const dynamic = 'force-dynamic'


async function getInitialGames() {  
  const response = await getGames({})
  return response
}

const ITEMS_PER_PAGE = 12;

interface PageProps {
  searchParams: {
    genre?: string;
    page?: string;
  };
}

export default async function Home({ searchParams }: PageProps) {
  // const initialGames = await getInitialGames()

   const genre = searchParams.genre;
  let page = parseInt(searchParams.page ?? "1");

  let games = allGames;

  if (genre) {
    games = games.filter(
      (game) => game.genre.toLowerCase() === genre.toLowerCase()
    );
  }

  if (page < 1 || isNaN(page)) page = 1;

  // Mock delay if you want to simulate loading
  await delay(2000);

  const fromIndex = (page - 1) * ITEMS_PER_PAGE;
  const toIndex = page * ITEMS_PER_PAGE;
  const paginatedGames = games.slice(fromIndex, toIndex);

  const totalPages = Math.ceil(allGames.length / ITEMS_PER_PAGE);
  const currentPage = page;
  
  const initialGames = {
    games: games,
    availableFilters: availableFilters,
    totalPages: totalPages,
    currentPage: currentPage
  }
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
