import PropTypes from 'prop-types';
import plusIcon from "../assets/icon-plus.svg";
import minusIcon from "../assets/icon-minus.svg";
// import { useState } from "react";
// import { UserAuth } from '../../context/AuthContext';

export const Rating = ({ addLike, likes, unLike, hasUserLiked }) => {
  // const { addLike } = UserAuth();
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
        onClick={hasUserLiked ? unLike : addLike}
        className={` ${hasUserLiked ? `` : `like-added`} cursor-pointer`}
        src={plusIcon}
        alt="icon plus"
        id="plus"
        />
      <span id="like">{likes ? likes.length : "0"}</span>
      {/* {console.log(likes)} */}
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


Rating.propTypes = {
  likes: PropTypes.array
}