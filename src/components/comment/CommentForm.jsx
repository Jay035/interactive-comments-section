import { useState } from "react";

export const CommentForm = ({
    handleSubmit, submitLabel, 
    currentUser, handleCancel,
    active = false, initialText = ""
}) => {
    const [text, setText] = useState(initialText)
    const isTextAreaDiabled = text.length === 0;
    const onSubmit = event => {
        event.preventDefault();
        handleSubmit(text);
        console.log(text)
        setText("")
    }
    return (
        <>
            {/* comment form displayed on mobile  */}
            <form id="comment__form--mobile" className={` ${active ? `flex-col` : ``} comment--form container wrapper flex justify-between align-top`} onSubmit={onSubmit}>
                <textarea 
                    name="comment--content" 
                    // id="comment--textarea" 
                    cols="30" 
                    rows="5"
                    value={text} 
                    onChange={(e) => setText(e.target.value)} 
                    placeholder="Add a comment" required 
                />
                
                <div className="flex justify-between">
                    {!active && <img src={currentUser.image.png} alt="" className="current__user--img avatar" />}
                    <div className={`${active ? `justify-end w-full` : ``} comment__form--buttons flex justify-between`}>
                        <button className="form-button" disabled={isTextAreaDiabled}>{submitLabel}</button>
                        {active && (
                            <button type="button" className="form-button comment__form--cancel--button" onClick={handleCancel}>CANCEL</button>
                        )}
                    </div>
                    
                </div>
            </form>
            {/* comment form displayed on desktop */}
            <form id="comment__form--desktop" className={` ${active ? `flex-col` : ``} comment--form container wrapper flex justify-between align-top`} onSubmit={onSubmit}>
                {!active && <img src={currentUser.image.png} alt="" className="current__user--img avatar" />}
                <textarea 
                    name="comment--content" 
                    // id="comment--textarea" 
                    cols="30" 
                    rows="4" 
                    value={text} 
                    onChange={(e) => setText(e.target.value)} 
                    placeholder="Add a comment" required 
                />
                <div className={`${active ? `justify-end w-full` : ``} comment__form--buttons flex justify-between`}>
                    <button className="form-button" disabled={isTextAreaDiabled}>{submitLabel}</button>
                    {active && (
                        <button type="button" className="form-button comment__form--cancel--button" onClick={handleCancel}>CANCEL</button>
                    )}
                </div>
            </form>
        </>
    )
}
