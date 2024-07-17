import { Inter } from "next/font/google";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { IMovieList } from "@/types/MovieList";
import { getUpcoming } from "@/utils/apiNames";
import { apiOptions } from "@/utils/apiOptions";
import { LocalStorageKey } from "@/utils/enum";
import { useEffect } from "react";
import { saveLocalStorage } from "@/utils/localstorageHandler";
import MovieCategoryList from "@/organisms/MovieCategoryList";

const inter = Inter({ subsets: ["latin"] });

export default function Index({
  dataMovieUpcoming,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  useEffect(() => {
    saveLocalStorage(
      LocalStorageKey.Upcoming,
      JSON.stringify(dataMovieUpcoming)
    );
  });

  return (
    <MovieCategoryList dataMovie={dataMovieUpcoming.results} title="Upcoming" />
  );
}

export const getServerSideProps: GetServerSideProps<{
  dataMovieUpcoming: IMovieList;
}> = async (ctx) => {
  const responseUpcoming = await fetch(getUpcoming, apiOptions);

  const jsonUpcoming = await responseUpcoming.json();

  return {
    props: {
      dataMovieUpcoming: jsonUpcoming,
    },
  };
};
