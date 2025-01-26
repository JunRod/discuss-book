function handlePushSubComment(state: any, newComment: any, id: any, isSubcomment = false) {

    const comments = isSubcomment ? state.subcomments : state.comments

    return comments.map((comment: any) => {

        // si el id del comentario seleccionado para subcomentar es igual al id del comentario actual,
        // se aniade el nuevo comentario al array de subcomentarios pero se le agrega la propiedad last en false a los demas subcomentarios y last en true al nuevo subcomentario
        if (comment.id === id) {
            const updatedSubcomments = comment.subcomments.map((subcomment: any) => ({
                ...subcomment,
                last: false,
            }))

            return {
                ...comment,
                subcomments: [...updatedSubcomments, { ...newComment, last: true }]
            }
        }

        return {
            ...comment,
            subcomments: handlePushSubComment(comment, newComment, id, true)
        }
    })
}

function handleDeleteComment(state: any, id: any, isSubcomment = false) {

    const comments = isSubcomment ? state.subcomments : state.comments

    const deleteCommentsInPDF = (comment: any) => {
        comment.subcomments.map((subcomment: any) => {
            state.instancePDF.annotationModule.deleteAnnotationById(subcomment.id);
        })
    }

    return comments
        .filter((comment: any) => {
            if (comment.id === id) {
                deleteCommentsInPDF(comment)
                return comment.id !== id
            }
        })
        .map((comment: any) => ({
            ...comment,
            subcomments: handleDeleteComment(comment, id, true),
        }));
}

export const initialState = {
    annotation: null,
    comment: null,
    comments: [],
    deleteComment: null,
    jumpToAnnotation: null,
    idSubComment: null,
    instancePDF: null,
}

export function reducer(state: any, action: any) {
    switch (action.type) {
        case 'setAnnotation':
            return {
                ...state,
                annotation: action.payload,
            }
        case 'setCommentInComments':
            return {
                ...state,
                comments: [...state.comments, action.payload]
            }
        case 'deleteComment':
            return {
                ...state,
                comments: handleDeleteComment(state, action.payload.id),
                deleteComment: action.payload
            }
        case 'jumpToAnnotation':
            return {
                ...state,
                jumpToAnnotation: action.payload
            }
        case 'setIdSubComment':
            return {
                ...state,
                idSubComment: action.payload
            }
        case 'setCommentInSubComment':
            return {
                ...state,
                comments: handlePushSubComment(state, action.payload.newComment, action.payload.id)
            }
        case 'setInstancePDF':
            return {
                ...state,
                instancePDF: action.payload
            }
        default:
            return state
    }
}