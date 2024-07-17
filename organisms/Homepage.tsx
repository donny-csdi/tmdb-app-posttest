import { Gap } from "@/components/gap";
import SliderMovie from "@/components/movie/movie-slider";
import ExploreMovie from "@/components/movie/movieList";
import { logo } from "@/components/navbar/navbar";
import { IMovieList } from "@/types/MovieList";
import Seo from "@/utils/seo";
import React from "react";

interface HomepageProps {
  dataNP: IMovieList;
  dataPopular: IMovieList;
  dataUpcoming: IMovieList;
}

const Homepage = ({ dataNP, dataPopular, dataUpcoming }: HomepageProps) => {
  return (
    <>
      <Seo
        title={"Absolute Cinema"}
        description={"Cinema yang dibuat oleh Developer Berijalan Technocenter"}
        image={logo}
      />
      <main className="flex min-h-screen flex-col">
        <div className="flex-1 sm:px-3 xs:py-5 py-7 w-full">
          <div className="max-w-[80%] sm:max-w-full lg:max-w-[90%] mx-auto flex flex-col gap-y-2">
            <SliderMovie
              movie={dataNP.results.slice(0, 10)}
              title="Now Playing"
            />
            <Gap height={24} />
            <SliderMovie
              movie={dataPopular.results.slice(0, 10)}
              title="Popular"
            />
            <Gap height={24} />
            <SliderMovie
              movie={dataUpcoming.results.slice(0, 10)}
              title="Upcoming"
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default Homepage;
