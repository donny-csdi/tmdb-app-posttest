import { Gap } from "@/components/gap";
import ExploreMovieFav from "@/components/movie/favList";
import SliderMovie from "@/components/movie/movie-slider";
import ExploreMovie from "@/components/movie/movieList";
import { logo } from "@/components/navbar/navbar";
import { IMovie, IMovieDetail, IMovieList } from "@/types/MovieList";
import { LocalStorageKey } from "@/utils/enum";
import { getLocalStorage } from "@/utils/localstorageHandler";
import Seo from "@/utils/seo";
import { title } from "process";
import React from "react";

interface MovieCategoryListProps {
  dataMovie: IMovie[];
  title: string;
}

const MovieCategoryListFav = ({ dataMovie, title }: MovieCategoryListProps) => {
  const favMovie: IMovieDetail[] =
    getLocalStorage(LocalStorageKey.Favorites) ?? [];
  return (
    <>
      <Seo
        title={title}
        description="Kumpulan berbagai film dari jenis kategori tertentu"
        image={logo}
      />
      <main className="flex min-h-screen flex-col">
        <div className="flex-1 sm:px-3 xs:py-5 py-7 w-full">
          <div className="max-w-[80%] sm:max-w-full lg:max-w-[90%] mx-auto flex flex-col gap-y-2">
            <ExploreMovieFav movie={favMovie} title={title} />
          </div>
        </div>
      </main>
    </>
  );
};

export default MovieCategoryListFav;
