import Link from "next/link";
import Image from "next/image";
import { IMovie, IMovieDetail } from "@/types/MovieList";
import { formatDate } from "@/utils/dateFormatter";
import { Calendar, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { getLocalStorage } from "@/utils/localstorageHandler";
import { LocalStorageKey } from "@/utils/enum";

type MovieCardProps = {
  movie: IMovieDetail;
};

const FavMovieCard = ({ movie }: MovieCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites: IMovie[] =
      getLocalStorage(LocalStorageKey.Favorites) ?? [];
    const isFav = favorites.some((favMovie) => favMovie.id === movie.id);
    setIsFavorite(isFav);
  }, [movie.id]);

  if (!movie) {
    return null;
  }
  if (!movie) {
    return null;
  }

  const calculateStars = (voteAverage: number) => {
    const maxStars = 5;
    return Math.ceil((voteAverage / 10) * maxStars);
  };

  const stars = calculateStars(movie.vote_average);

  return (
    <Link href={`/${movie.id}`}>
      <div className="w-full pr-2 relative">
        <div className="w-full lg:h-[380px] xs:h-[240px] h-[450px] rounded-md relative">
          <Image
            fill
            sizes="100%"
            priority
            style={{ objectFit: "fill" }}
            alt={movie.title}
            className="rounded-md"
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          />
          <div className="absolute top-2 left-3 w-[30px] h-[30px] flex justify-center items-center">
            <Star
              className={`${
                isFavorite ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
              }`}
            />
          </div>
          {movie.adult && (
            <p className="text-[11px] absolute top-2 right-3 w-[30px] h-[30px] flex justify-center items-center rounded-full bg-red-500 text-white font-semibold uppercase">
              15+
            </p>
          )}
          <div className="flex absolute bottom-[-20px] left-3 w-[80px] h-[80px] items-center mt-1">
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
            <p className="px-2">{movie.vote_average.toFixed(1)}</p>
          </div>
        </div>
        <div className="py-4">
          <h4
            className={`text-[12px] w-[80%] whitespace-nowrap text-ellipsis overflow-hidden font-semibold text-purple-800 dark:text-white`}
          >
            {movie.title}
          </h4>
          <p
            className={`text-[11px] flex items-center text-gray-500 font-normal mt-1`}
          >
            <Calendar className="w-3 h-3 mr-1.5" />
            {formatDate(new Date(movie.release_date))}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default FavMovieCard;
