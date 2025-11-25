"use client";

import { getGames } from "@/lib/api/games";
import useGamesStore, { gameSelectors } from "@/stores/games";
import { useEffect, useState } from "react";
import { Text } from "../ui/text";
import GameCard from "../GameCard/GameCard";
import { Game } from "@/utils/endpoint";
import useCartStore from "@/stores/shoppingCart";
import Button from "../ui/button";
import Filter from "../Filter/Filter";
import { GamesApiResponse } from "@/lib/types";

interface GamesGridProps {
  data: GamesApiResponse;
  filter?: string;
}

const GamesGrid = ({ data, filter = "" }: GamesGridProps) => {
  const [totalPages, setTotalPages] = useState<number>(0);
  const isLoading = useGamesStore(gameSelectors.isLoading);
  const allGames = useGamesStore(gameSelectors.selectAllGames);
  const error = useGamesStore(gameSelectors.selectError);
  const currentFilter = useGamesStore(gameSelectors.selectCurrentFilter);
  const {
    setGames,
    setLoading,
    setError,
    setAvailableFilters,
    setCurrentFilter,
    setCurrentPage,
    currentPage,
    increaseCurrentPage,
  } = useGamesStore();

  const { addItem } = useCartStore();

  const displayGames = allGames || data?.games;

  useEffect(() => {
    const loadGames = async () => {
      try {
        setLoading(true);
        const data = await getGames({
          genre: currentFilter,
          page: currentPage,
        });
        setGames(data?.games);
        setTotalPages(data?.totalPages);
        setCurrentPage(data?.currentPage);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to load games"
        );
      } finally {
        setLoading(false);
      }
    };

    loadGames();
  }, [
    setGames,
    setLoading,
    setError,
    currentFilter,
    currentPage,
    setTotalPages,
    setCurrentPage,
  ]);

  useEffect(() => {
    if (data) {
      setGames(data?.games);
      setAvailableFilters(data?.availableFilters);
    }
  }, [data, setAvailableFilters, setGames]);

  useEffect(() => {
    if (filter) {
      setCurrentFilter(filter);
    }
  }, [filter, setCurrentFilter]);

  const handleAddToCart = (game: Game, quantity: number) => {
    addItem(game, quantity);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Text className="text-gray-500">Loading games...</Text>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Text className="text-red-500">Error: {error}</Text>
      </div>
    );
  }

  if (displayGames?.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Text className="text-gray-500">No games found</Text>
      </div>
    );
  }

  const handleSeeMore = () => {
    increaseCurrentPage();
  };

  return (
    <div className="flex flex-col">
      <Filter className="w-[100px]" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-10 gap-y-10 py-8">
        {displayGames?.map((game: Game) => {
          const { id, name, genre, price, image } = game;
          return (
            <GameCard
              key={id}
              title={name}
              genre={genre}
              price={price}
              imageUrl={image}
              onAddToCart={() => handleAddToCart(game, 1)}
            />
          );
        })}
      </div>
      {currentPage < totalPages && (
        <Button isLoading={false} onClick={handleSeeMore}>
          See More
        </Button>
      )}
    </div>
  );
};

export default GamesGrid;
