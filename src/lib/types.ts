export type GameGenre =
  | 'Action'
  | 'RPG'
  | 'Adventure'
  | 'Shooter'
  | 'Simulation'
  | 'Racing'
  | 'Sports'
  | 'MMORPG'
  | 'Puzzle'
  | 'Horror'
  | 'Indie'
  | 'Action-Adventure'
  | 'Strategy'
  | 'MOBA'
  | 'Battle Royale';

  // Single game interface
export interface Game {
  id: string;
  genre: GameGenre;
  image: string;
  name: string;
  description: string;
  price: number;
  isNew: boolean;
}

// API response interface
export interface GamesApiResponse {
  games: Game[];
  availableFilters: GameGenre[];
  totalPages: number;
  currentPage: number;
}

// Optional: Pagination metadata
export interface PaginationMeta {
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// Optional: Extended response with computed pagination info
export interface GamesApiResponseExtended extends GamesApiResponse {
  meta: PaginationMeta;
}

// Optional: Query parameters for API requests
export interface GamesQueryParams {
  page?: number;
  genre?: GameGenre;
  search?: string;
  sortBy?: 'price' | 'name' | 'newest';
  sortOrder?: 'asc' | 'desc';
  minPrice?: number;
  maxPrice?: number;
  isNew?: boolean;
}

// Optional: Filter options interface
export interface GameFilters {
  genres: GameGenre[];
  priceRange?: {
    min: number;
    max: number;
  };
  isNew?: boolean;
}