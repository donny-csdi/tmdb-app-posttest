"use client";

import Slider from "react-slick";
import { useState } from "react";
import LoadingSpinner from "../ui/iconLoading";
import { movieSliderOptions } from "@/utils/sliderOptions";
import { IMovie } from "@/types/MovieList";
import MovieCard from "../ui/movieCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button } from "../ui/button";

interface SliderMovieProps {
  movie: IMovie[];
  title: string;
}

const SliderMovie = ({ movie, title }: SliderMovieProps) => {
  const loading = () => {
    return <LoadingSpinner width={24} height={24} color="#002373" />;
  };

  const navigateSpecificCategory = () => {
    switch (title) {
      case "Now Playing":
        return "/now-playing";
      case "Popular":
        return "/popular";
      case "Upcoming":
        return "/upcoming";
      default:
        return "/";
    }
  };

  return (
    <div className="w-full px-12">
      <div className="flex items-center justify-between">
        <h2
          className={`text-[24px] text-purple-800 dark:text-white font-semibold`}
        >
          {title}
        </h2>
        <Button
          variant={"default"}
          onClick={() => {
            window.location.href = navigateSpecificCategory();
          }}
        >
          See More
        </Button>
      </div>
      <div className="mt-4">
        {!movie && loading()}
        <Slider {...movieSliderOptions}>
          {movie &&
            movie.length > 0 &&
            movie.map((movie: IMovie, idx: number) => (
              <MovieCard movie={movie} key={idx} />
            ))}
        </Slider>
      </div>
    </div>
  );
};

export default SliderMovie;
