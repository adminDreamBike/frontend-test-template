/* eslint-disable  @typescript-eslint/no-explicit-any */
import { GamesApiResponse } from "../types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export class ApiError extends Error {
  constructor(message: string, public status: number, public data?: any) {
    super(message);
    this.name = "ApiError";
  }
}
async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  try {
    console.log('`${API_BASE_URL}${endpoint}`', `${API_BASE_URL}${endpoint}`)
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-type": "application/json",
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new ApiError(
        errorData?.message || `HTTP Error: ${response.status}`,
        response.status,
        errorData
      );
    }
    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      error instanceof Error ? error.message : "Network error",
      0
    );
  }
}

export async function getGames({
  genre = "",
  page = 1,
}: {
  genre?: string;
  page?: number;
}): Promise<GamesApiResponse> {
  return fetchApi<GamesApiResponse>(`/api/games?genre=${genre}&page=${page}`);
}
