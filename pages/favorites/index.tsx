import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { IMovie } from "@/types/MovieList";
import { LocalStorageKey } from "@/utils/enum";
import { getLocalStorage } from "@/utils/localstorageHandler";
import MovieCategoryList from "@/organisms/MovieCategoryList";
import MovieCategoryListFav from "@/organisms/MovieFavorite";

const inter = Inter({ subsets: ["latin"] });

export default function Index() {
  const [dataMovie, setDataMovie] = useState<IMovie[]>([]);

  useEffect(() => {
    const favorites: IMovie[] =
      getLocalStorage(LocalStorageKey.Favorites) ?? [];
    console.log(favorites);
    setDataMovie(favorites);
  }, []);

  return <MovieCategoryListFav dataMovie={dataMovie} title="Favorites" />;
}
