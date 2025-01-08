'use client'

import { use, useContext, useEffect, useState } from "react";
import { ThemeContext } from "../app/[book]/state/context";
import { SendHorizontal } from "lucide-react";

function InputComments() {

    const { state, dispatch } = useContext(ThemeContext)
    const [comment, setComment] = useState('')

    const handlePushComment = () => {
        if (state.annotation && state.textSelected && comment) {
            dispatch({
                type: 'setCommentInComments',
                payload: {
                    'photo': 'https://avatars.githubusercontent.com/u/87834204?v=4',
                    'name': 'JunRod',
                    'comment': comment,
                    'date': new Date().getTime(),
                    'likes': 0,
                    id: state.annotation.id,
                    annotation: state.annotation,
                    textSelected: state.textSelected,
                    subcomments: []
                }
            });

            dispatch({ type: 'setAnnotation', payload: null });
            dispatch({ type: 'setTextSelected', payload: '' });
        }
    }

    return (
        state.annotation &&
        <div id="container-comment" className="fixed bottom-0 w-[52rem] h-[14rem] flex flex-row justify-center z-50">
            <div id="container-comment-write" className="border-[1px] border-[#525252] bg-neutral-900 rounded-[1rem] w-[96%] h-[6rem] flex flex-row p-[1rem] items-center gap-[1rem]">
                <input
                    type="text"
                    name="comment-write"
                    id="comment-write"
                    className=" appearance-none border-none bg-transparent text-white outline-none font-testSohneKraftig text-[1.4rem] w-full"
                    onChange={e => setComment(e.target.value)}
                />
                <SendHorizontal cursor={'pointer'} onClick={handlePushComment} />
            </div>
        </div>
    );
}

export default InputComments;