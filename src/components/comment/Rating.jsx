import plusIcon from "../assets/icon-plus.svg";
import minusIcon from "../assets/icon-minus.svg";
import { useState } from "react";

export const Rating = ({ addLike, likes, unLike, hasUserLiked }) => {
  // const increaseLikeCount = () => {
  //   setLike(prevValue =>  prevValue + 1)
  // }

  // const decreaseLikeCount = () => {
  //   if(like === 0) setLike(0)
  //   else{
  //     setLike(prevValue =>  prevValue - 1)
  //   }
  // }
  return (
    <section className="likes font-bold flex justify-between align-center">
      <img
        onClick={addLike}
        className={` ${hasUserLiked ? `like-added` : ``} cursor-pointer`}
        src={plusIcon}
        alt="icon plus"
        id="plus"
      />
      <span id="like">{likes ? likes?.length : "0"}</span>
      <img
        onClick={unLike}
        className={` ${hasUserLiked ? `like-added` : ``} cursor-pointer`}
        src={minusIcon}
        alt="icon minus"
        id="minus"
      />
    </section>
  );
};
