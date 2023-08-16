import { useRef, useState } from "react";
import { useGetTrendingQuery } from "../../features/api/tmdbSlice";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import ListingBtn from "./ListingBtn/ListingBtn";
import MediaCard from "../MediaCard/MediaCard";
import ErrorIndicator from "../ErrorIndicator/ErrorIndicator";
import CardSkeleton from "../../skeletons/CardSkeleton";

import "./listing.scss";

const Listing = ({ type }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, error, isLoading, isSuccess, isError } =
    useGetTrendingQuery(type);
  const [parent, enable] = useAutoAnimate();
  const myRef = useRef(null);

  const executeScroll = () => {
    myRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleClick = () => {
    if (isOpen) executeScroll();
    enable(!isOpen);
    setIsOpen(!isOpen);
  };

  const renderList = (data) => {
    const list = data.map((mediaItem) => {
      return (
        <li key={mediaItem.id}>
          <MediaCard media={mediaItem} descr />
        </li>
      );
    });

    return (
      <>
        {list}
        <li
          className={`listing__btn listing__btn--${
            isOpen ? "opened" : "closed"
          }`}
        >
          <ListingBtn handleClick={handleClick} isOpen={isOpen} />
        </li>
      </>
    );
  };

  const renderSkeletons = Array.from(Array(5).keys()).map((item) => (
    <li key={item}>
      <CardSkeleton />
    </li>
  ));

  if (!isLoading && isError)
    return (
      <ErrorIndicator
        errorMsg={`${error.status} ${error.data.status_message}`}
      />
    );

  return (
    <section ref={myRef} className="listing">
      <h2 className="listing__title">
        <span>Popular </span>
        {type === "movie" ? "Movies" : "TV Shows"}
      </h2>
      <ul className="listing__list listing__list--visible" ref={parent}>
        {isLoading && renderSkeletons}
        {isSuccess && renderList(isOpen ? data : data.slice(0, 5))}
      </ul>
    </section>
  );
};

export default Listing;
