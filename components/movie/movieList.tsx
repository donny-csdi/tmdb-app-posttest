import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import LoadingSpinner from "../ui/iconLoading";
import { IMovie } from "@/types/MovieList";
import MovieCard from "../ui/movieCard";
import { getNowPlaying } from "@/utils/apiNames";
import { apiOptions } from "@/utils/apiOptions";

interface ExploreMovieProps {
  movie: IMovie[];
  title: string;
}

const ExploreMovie = ({ movie, title }: ExploreMovieProps) => {
  console.log(movie);
  const { inView, ref } = useInView();
  const [nextPage, setNextPage] = useState<number>(2); // Start with page 2 if the initial data is page 1
  const [isLoading, setIsLoading] = useState(false);
  const [dataMovie, setDataMovie] = useState<IMovie[]>(movie);

  const fetchMoreData = async () => {
    try {
      const res = await fetch(`${getNowPlaying}?page=${nextPage}`, apiOptions);
      const json = await res.json();
      setDataMovie((prevMovies) => [...prevMovies, ...json.results]);
      setNextPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Failed to fetch more data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (inView && !isLoading) {
      setIsLoading(true);
      fetchMoreData();
    }
  }, [inView]);

  return (
    <div className="w-full px-12">
      <h2 className="text-[24px] dark:text-white text-purple-800 font-medium">
        {title}
      </h2>
      <div className="w-full mt-4 grid grid-cols-5 lg:grid-cols-4 sm:grid-cols-2 lg:gap-1 gap-3">
        {dataMovie?.map((movie: IMovie, idx: number) => (
          <MovieCard movie={movie} key={idx} />
        ))}
      </div>
      {isLoading && <LoadingSpinner width={24} height={24} color="#002373" />}
      <div ref={ref}></div>
    </div>
  );
};

export default ExploreMovie;
