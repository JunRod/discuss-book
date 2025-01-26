'use client'

import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../app/[book]/state/context";
import { SendHorizontal } from "lucide-react";

function InputComments() {

    const { state, dispatch } = useContext(ThemeContext)
    const [comment, setComment] = useState('')

    useEffect(() => {
        console.log('state.comments', state)
    }, [state])

    const handlePushComment = () => {

        if (state.idSubComment) {
            dispatch({
                type: 'setCommentInSubComment',
                payload: {
                    newComment: {
                        'photo': 'https://avatars.githubusercontent.com/u/87834204?v=4',
                        'name': 'JunRod',
                        'comment': comment,
                        'date': new Date().getTime(),
                        'likes': 0,
                        id: state.annotation.annotationId,
                        annotation: state.annotation,
                        textSelected: state.textMarkupContent,
                        subcomments: []
                    },
                    id: state.idSubComment
                }
            });
        }

        if (state.annotation && comment.length > 0 && !state.idSubComment) {

            dispatch({
                type: 'setCommentInComments',
                payload: {
                    photo: 'https://avatars.githubusercontent.com/u/87834204?v=4',
                    name: 'JunRod',
                    comment: comment,
                    date: new Date().getTime(),
                    likes: 0,
                    id: state.annotation.annotationId,
                    annotation: state.annotation,
                    textSelected: state.annotation.textMarkupContent,
                    subcomments: []
                }
            })
        }

        dispatch({ type: 'setAnnotation', payload: null });
    }

    return (
        state.annotation &&
        <div id="container-comment" className="fixed bottom-0 w-[54rem] h-[16rem] flex flex-row justify-center z-50">
            <div id="container-comment-write" className="border-[1px] border-[#525252] bg-neutral-900 rounded-[1rem] w-[96%] h-[6rem] px-[1.5rem] py-[1rem]">
                <div className="w-full h-full flex flex-row gap-[1rem] items-center">
                    <input
                        type="text"
                        name="comment-write"
                        id="comment-write"
                        className=" appearance-none border-none bg-transparent text-white outline-none font-testSohneKraftig text-[1.4rem] w-full"
                        onChange={e => setComment(e.target.value)}
                    />
                    <SendHorizontal
                        cursor={'pointer'}
                        onClick={handlePushComment}
                    />
                </div>
            </div>
        </div>
    );
}

export default InputComments;