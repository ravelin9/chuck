import {createEffect, createStore} from "effector";
import axios from "axios";

interface Joke {
    id: string;
    created_at: string;
    value: string;
    url: string;
}

interface SearchResponse {
    total: number;
    result: Joke[];
}

export const searchJokesFx = createEffect<string, SearchResponse, Error>(
    async (query) => {
        const response = await axios.get(`https://api.chucknorris.io/jokes/search?query=${query}`);
        return await response.data;
    }
);

export const $searchResult = createStore<SearchResponse>({total: 0, result: []});

$searchResult.on(searchJokesFx.doneData, (_, data) => data);

searchJokesFx.fail.watch((error) => {
    console.error("Search failed:", error);
});

