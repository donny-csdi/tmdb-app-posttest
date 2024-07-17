import { useEffect, useState } from "react";
import { Gap } from "@/components/gap";
import { Button } from "@/components/ui/button";
import { IMovieDetail } from "@/types/MovieList";
import { LocalStorageKey } from "@/utils/enum";
import { getLocalStorage, saveLocalStorage } from "@/utils/localstorageHandler";
import { Star, Timer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import Seo from "@/utils/seo";
import { logo } from "@/components/navbar/navbar";

type MovieDetailHeroProps = {
  dataMovie: IMovieDetail;
};

const MovieDetailHero = ({ dataMovie }: MovieDetailHeroProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const favorites: IMovieDetail[] =
    getLocalStorage(LocalStorageKey.Favorites) ?? [];

  useEffect(() => {
    const isFav = favorites.some((movie) => movie.id === dataMovie.id);
    setIsFavorite(isFav);
  }, [dataMovie.id, favorites]);

  const calculateStars = (voteAverage: number) => {
    const maxStars = 5;
    return Math.ceil((voteAverage / 10) * maxStars);
  };

  const saveFavorites = (movie: IMovieDetail) => {
    const updatedFavorites = [...favorites, movie];
    saveLocalStorage(
      LocalStorageKey.Favorites,
      JSON.stringify(updatedFavorites)
    );
    setIsFavorite(true);

    return alert(movie.id);
  };

  const removeFavorites = (movieId: number) => {
    const updatedFavorites = favorites.filter((movie) => movie.id !== movieId);
    saveLocalStorage(
      LocalStorageKey.Favorites,
      JSON.stringify(updatedFavorites)
    );
    setIsFavorite(false);
    return alertRemove();
  };

  const stars = calculateStars(dataMovie.vote_average);

  const alert = (movieId: number) => {
    return toast.success("Movie has been added to favorites", {
      description: "You can check it in the Favorites Page",
      duration: 3000,
      action: {
        label: "Undo",
        onClick: () => removeFavorites(movieId),
      },
    });
  };

  const alertRemove = () => {
    return toast.error("Movie has been removed from favorites", {
      description: "You can try add another movies to Favorites Page",
      duration: 3000,
      action: {
        label: "Close",
        onClick: () => toast.dismiss(),
      },
    });
  };

  return (
    <>
      <Seo
        title={dataMovie.title}
        description={dataMovie.overview}
        image={logo}
      />
      <div
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${dataMovie?.backdrop_path}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
        className="w-full h-[100vh] xs:py-5 xs:overflow-y-scroll relative py-6"
      >
        <div className="w-full h-full bg-gray-900/50 flex justify-center items-center">
          <div className="max-w-[80%] lg:max-w-[90%] sm:max-w-full sm:px-3 sm:flex-col sm:items-center flex items-start gap-x-7 px-6">
            <Image
              width={250}
              height={400}
              className="rounded-md"
              src={`https://image.tmdb.org/t/p/original/${dataMovie?.poster_path}`}
              alt={dataMovie?.title}
            />
            <div className="flex-1 sm:mt-7 px-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-purple-500">
                  {dataMovie?.title}
                </h2>
                <Button
                  variant={isFavorite ? "destructive" : "secondary"}
                  onClick={() => {
                    isFavorite
                      ? removeFavorites(dataMovie.id)
                      : saveFavorites(dataMovie);
                  }}
                >
                  {isFavorite ? "Remove from favorites" : "Add to favorites"}
                </Button>
              </div>
              <div className="flex mt-2 items-center gap-x-3 mr-6">
                <div className="flex items-center gap-x-2 text-[13px] text-black dark:text-white">
                  <Timer className="flex py-3" />
                  <p className="px-2">{dataMovie?.runtime} minutes</p>
                </div>

                <div className="flex px-6 w-[80px] h-[80px] items-center mt-1">
                  {Array.from({ length: 5 }, (_, index) => (
                    <div key={index}>
                      <Star
                        className={`${
                          index < stars
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-gray-300"
                        }`}
                      />
                    </div>
                  ))}
                  <p className="px-2">{dataMovie.vote_average.toFixed(1)}</p>
                </div>
              </div>
              <p className="text-[12px] mt-3 text-black dark:text-white mb-5">
                {dataMovie?.overview}
              </p>
              <Gap height={24} />
              <p className="flex items-center gap-x-2 text-[13px] text-black dark:text-white font-semibold">
                Genres
              </p>
              <Gap height={12} />
              <div className="max-w-[55%] lg:max-w-full  grid grid-cols-4 gap-2 mt-3">
                {dataMovie?.genres?.map((item: any, idx: number) => (
                  <div className="w-full block" key={idx}>
                    <Button className=" w-full text-[12px] font-semibold p-2 rounded-full text-white">
                      {item?.name}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetailHero;
