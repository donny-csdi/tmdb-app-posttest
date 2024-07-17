import { Inter } from "next/font/google";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  Metadata,
} from "next";
import { IMovieDetail, IMovieList } from "@/types/MovieList";
import { getDetail } from "@/utils/apiNames";
import { apiOptions } from "@/utils/apiOptions";
import { LocalStorageKey } from "@/utils/enum";
import { useEffect } from "react";
import { saveLocalStorage } from "@/utils/localstorageHandler";
import MovieCategoryList from "@/organisms/MovieCategoryList";
import MovieDetailHero from "@/organisms/MovieDetail";

const inter = Inter({ subsets: ["latin"] });

export default function Index({
  dataMovieDetail,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  useEffect(() => {
    saveLocalStorage(LocalStorageKey.Detail, JSON.stringify(dataMovieDetail));
  });

  return (
    <div className="w-full h-screen">
      <div className="flex h-screen w-full p-0 bg-gray-900/50">
        <MovieDetailHero dataMovie={dataMovieDetail} />
      </div>
    </div>
  );
}

export const generateMetaDataMovie = async (ctx: any) => {
  const movie = await fetch(getDetail.replace(":id", ctx.query.id));
  const jsonMovie = await movie.json();

  return {
    title: jsonMovie.title,
    description: jsonMovie.overview,
    keywords: jsonMovie.genres.map((genre: any) => genre.name).join(", "),
  } as Metadata;
};

export const getServerSideProps: GetServerSideProps<{
  dataMovieDetail: IMovieDetail;
}> = async (ctx) => {
  const { id } = ctx.query;
  const responseDetail = await fetch(
    getDetail.replace(":id", id as string),
    apiOptions
  );

  const jsonDetail = await responseDetail.json();

  return {
    props: {
      dataMovieDetail: jsonDetail,
    },
  };
};
