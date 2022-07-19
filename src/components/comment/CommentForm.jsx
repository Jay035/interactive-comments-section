import { useState } from "react";

export const CommentForm = ({handleSubmit, submitLabel, currentUser}) => {
    const [text, setText] = useState("")
    const isTextAreaDiabled = text.length === 0;
    const onSubmit = event => {
        event.preventDefault();
        handleSubmit(text);
        console.log(text)
        setText("")
    }
    return (
        <>
            {/* comment form dispayed on mobile  */}
            <form id="comment__form--mobile" className="comment--form container wrapper" onSubmit={onSubmit}>
                <textarea 
                    name="comment--content" 
                    id="comment--textarea" 
                    cols="30" 
                    rows="4" 
                    value={text} 
                    onChange={(e) => setText(e.target.value)} 
                    placeholder="Add a comment" required 
                />
                <div className="flex justify-between">
                    <img src={currentUser.image.png} alt="" className="current__user--img avatar" />
                    <button className="comment__form-button" disabled={isTextAreaDiabled}>{submitLabel}</button>
                </div>
            </form>
            {/* comment form dispayed on desktop */}
            <form id="comment__form--desktop" className="comment--form container wrapper flex justify-between align-top" onSubmit={onSubmit}>
                <img src={currentUser.image.png} alt="" className="current__user--img avatar" />
                <textarea 
                    name="comment--content" 
                    id="comment--textarea" 
                    cols="30" 
                    rows="4" 
                    value={text} 
                    onChange={(e) => setText(e.target.value)} 
                    placeholder="Add a comment" required 
                />
                <button className="comment__form-button" disabled={isTextAreaDiabled}>{submitLabel}</button>
            </form>
        </>
    )
}
