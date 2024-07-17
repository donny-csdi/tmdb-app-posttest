import { Inter } from "next/font/google";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { IMovieList } from "@/types/MovieList";
import { getNowPlaying, getPopular, getUpcoming } from "@/utils/apiNames";
import { apiOptions } from "@/utils/apiOptions";
import { LocalStorageKey } from "@/utils/enum";
import { useEffect } from "react";
import { saveLocalStorage } from "@/utils/localstorageHandler";
import MovieCategoryList from "@/organisms/MovieCategoryList";

const inter = Inter({ subsets: ["latin"] });

export default function Index({
  dataMovieNowPlaying,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  useEffect(() => {
    saveLocalStorage(
      LocalStorageKey.NowPlaying,
      JSON.stringify(dataMovieNowPlaying)
    );
  });

  return (
    <MovieCategoryList
      dataMovie={dataMovieNowPlaying.results}
      title="Now Playing"
    />
  );
}

export const getServerSideProps: GetServerSideProps<{
  dataMovieNowPlaying: IMovieList;
}> = async (ctx) => {
  const responseNowPlaying = await fetch(getNowPlaying, apiOptions);

  const jsonNowPlaying = await responseNowPlaying.json();

  return {
    props: {
      dataMovieNowPlaying: jsonNowPlaying,
    },
  };
};
