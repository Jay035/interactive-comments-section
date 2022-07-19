import plusIcon from '../assets/icon-plus.svg';
import minusIcon from '../assets/icon-minus.svg';

export const Rating = ({comment}) => {
  return (
    <section className="likes font-bold flex justify-between align-center">
        <img className="cursor-pointer" src={plusIcon} alt="icon plus" id="plus"/>
        <span id="like">{ comment.score }</span>
        <img className="cursor-pointer" src={minusIcon} alt="icon minus" id="minus"/>
    </section>
  )
}
