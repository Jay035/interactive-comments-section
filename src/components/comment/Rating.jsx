import plusIcon from '../assets/icon-plus.svg';
import minusIcon from '../assets/icon-minus.svg';

export const Rating = ({like, setLike}) => {
  const increaseLikeCount = () => {
    setLike(prevValue =>  prevValue + 1)
  }
  
  const decreaseLikeCount = () => {
    if(like === 0) setLike(0)
    else{
      setLike(prevValue =>  prevValue - 1)
    }
  }
  return (
    <section className="likes font-bold flex justify-between align-center">
        <img onClick={increaseLikeCount} className="cursor-pointer" src={plusIcon} alt="icon plus" id="plus"/>
        <span id="like">{ like }</span>
        <img onClick={decreaseLikeCount} className="cursor-pointer" src={minusIcon} alt="icon minus" id="minus"/>
    </section>
  )
}
