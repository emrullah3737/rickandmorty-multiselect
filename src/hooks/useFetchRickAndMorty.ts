import { useEffect, useState } from "react";

interface IResponse {
  info: {
    count: number;
    prev: string | null;
    next: string | null;
    pages: number;
  };
  results: {
    id: number;
    created: string;
    episode: string[];
    gender: string;
    image: string;
    location: { name: string; url: string };
    origin: { name: string; url: string };
    name: string;
    species: string;
    status: string;
    type: string;
    url: string;
  }[];
}

export default function useFetchRickAndMorty(searchText: string) {
  const [list, setList] = useState<IResponse["results"]>([]);
  const [isFetching, setFetching] = useState(false);
  const [isError, setError] = useState(false);

  useEffect(() => {
    const search = async () => {
      setFetching(true);
      setError(false);
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?name=${searchText}`
      );
      setFetching(false);

      if (!response.ok) {
        setError(true);
        setList([]);
        return;
      }

      const jsonResponse: IResponse = await response.json();
      setList(jsonResponse.results);
    };

    search();
  }, [searchText]);

  return { list, isFetching, isError };
}
