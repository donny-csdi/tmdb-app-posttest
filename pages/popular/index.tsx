import { Inter } from "next/font/google";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { IMovieList } from "@/types/MovieList";
import { getPopular } from "@/utils/apiNames";
import { apiOptions } from "@/utils/apiOptions";
import { LocalStorageKey } from "@/utils/enum";
import { useEffect } from "react";
import { saveLocalStorage } from "@/utils/localstorageHandler";
import MovieCategoryList from "@/organisms/MovieCategoryList";

const inter = Inter({ subsets: ["latin"] });

export default function Index({
  dataMoviePopular,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  useEffect(() => {
    saveLocalStorage(LocalStorageKey.Popular, JSON.stringify(dataMoviePopular));
  });

  return (
    <MovieCategoryList dataMovie={dataMoviePopular.results} title="Popular" />
  );
}

export const getServerSideProps: GetServerSideProps<{
  dataMoviePopular: IMovieList;
}> = async (ctx) => {
  const responsePopular = await fetch(getPopular, apiOptions);

  const jsonPopular = await responsePopular.json();

  return {
    props: {
      dataMoviePopular: jsonPopular,
    },
  };
};
