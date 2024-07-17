import { Inter } from "next/font/google";
import Homepage from "@/organisms/Homepage";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { IMovieList } from "@/types/MovieList";
import { getNowPlaying, getPopular, getUpcoming } from "@/utils/apiNames";
import { apiOptions } from "@/utils/apiOptions";
import { LocalStorageKey } from "@/utils/enum";
import { useEffect } from "react";
import { saveLocalStorage } from "@/utils/localstorageHandler";

const inter = Inter({ subsets: ["latin"] });

export default function Home({
  dataMovieNowPlaying,
  dataMoviePopular,
  dataMovieUpcoming,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  useEffect(() => {
    saveLocalStorage(
      LocalStorageKey.NowPlaying,
      JSON.stringify(dataMovieNowPlaying)
    );
    saveLocalStorage(LocalStorageKey.Popular, JSON.stringify(dataMoviePopular));
    saveLocalStorage(
      LocalStorageKey.Upcoming,
      JSON.stringify(dataMovieUpcoming)
    );
  });

  return (
    // <main className={`flex h-screen flex-col w-full ${inter.className}`}>
    <Homepage
      dataNP={dataMovieNowPlaying}
      dataPopular={dataMoviePopular}
      dataUpcoming={dataMovieUpcoming}
    />
    // </main>
  );
}

export const getServerSideProps: GetServerSideProps<{
  dataMovieNowPlaying: IMovieList;
  dataMoviePopular: IMovieList;
  dataMovieUpcoming: IMovieList;
}> = async (ctx) => {
  const responseNowPlaying = await fetch(getNowPlaying, apiOptions);
  const responsePopular = await fetch(getPopular, apiOptions);
  const responseUpcoming = await fetch(getUpcoming, apiOptions);

  const jsonNowPlaying = await responseNowPlaying.json();
  const jsonPopular = await responsePopular.json();
  const jsonUpcoming = await responseUpcoming.json();

  return {
    props: {
      dataMovieNowPlaying: jsonNowPlaying,
      dataMoviePopular: jsonPopular,
      dataMovieUpcoming: jsonUpcoming,
    },
  };
};
