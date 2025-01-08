'use client'

import { Heart, HighlighterIcon, MessageCircle, Trash } from "lucide-react";
import { useContext } from "react";
import { ThemeContext } from "./state/context";

function tiempoTranscurrido(timestamp: number) {
    // Convierte el timestamp (en segundos) a milisegundos
    const fechaDada: any = new Date(timestamp * 1000);

    // Obtiene la fecha actual
    const fechaActual: any = new Date();

    // Calcula la diferencia en milisegundos
    const diferenciaMs = fechaActual - fechaDada;

    // Convierte la diferencia en días, horas, minutos y segundos
    const segundos = Math.floor((diferenciaMs / 1000) % 60);
    const minutos = Math.floor((diferenciaMs / (1000 * 60)) % 60);
    const horas = Math.floor((diferenciaMs / (1000 * 60 * 60)) % 24);
    const dias = Math.floor(diferenciaMs / (1000 * 60 * 60 * 24));
    // Aproximación de meses (30 días por mes)
    const meses = Math.floor(dias / 30);
    const anios = Math.floor(meses / 12);

    if (anios > 0) {
        return anios + ' years ago';
    } else if (meses > 0) {
        return meses + ' months ago';
    } else if (dias > 0) {
        return dias + ' days ago';
    } else if (horas > 0) {
        return horas + ' hours ago';
    } else if (minutos > 0) {
        return minutos + ' minutes ago';
    } else {
        return 'seconds ago';
    }
}

const CommentsViwer = (props: any) => {

    const { state, dispatch } = useContext(ThemeContext)

    const handleDeleteComment = (id: string) => {
        dispatch({ type: 'deleteComment', payload: id });
    }

    const handleJumpToAnnotation = (pageIndex: number, boundingBox: any) => {
        dispatch({ type: 'jumpToAnnotation', payload: { pageIndex, boundingBox } });
    }

    const recursiveRendering = (data: any, isSubcomment = false) => data.map((comment: any) => (
        <div
            key={comment.date}
            className={`h-auto flex flex-col gap-[1rem] self-end w-full relative z-20 ${comment?.last ? "before:h-full before:w-[3%] before:bg-neutral-900 before:bottom-[-1.2rem] before:left-[-1rem] before:content-[''] before:absolute before:z-[-10]" : ''} `}
            style={{ width: `${isSubcomment ? `95%` : 'w-full'}` }}
        >
            {
                comment.subcomments && (
                    <div id='barra' className='w-[0.1rem] h-full bg-neutral-600 absolute left-[1.6rem]' />
                )
            }

            <header className={`flex flex-row gap-3 items-center w-full z-10 h-auto ${isSubcomment ? 'before:top-[1.2rem] before:left-[-1rem] before:absolute before:content-[""] before:h-[1px] before:w-[4%] before:border-t-[1px] before:border-neutral-600 before:z-[-10]' : ''}`}>
                <span className="font-testSohneKraftig text-[1.4rem] h-[3rem] w-[3rem] rounded-full overflow-hidden">
                    <img src={comment.photo} className="h-full w-full object-cover" />
                </span>
                <span className="font-testSohneKraftig text-[1.4rem]">{comment.name}</span>
                <span className='h-[0.5rem] w-[0.5rem] bg-neutral-500 rounded-full' />
                <span className="font-testSohneKraftig text-[1.4rem]">{tiempoTranscurrido(comment.date)}</span>
            </header>
            <div className={`self-end flex flex-col gap-[1rem]`} style={{ width: '94%' }}>
                <main className="flex flex-row">
                    <p className="font-testSohneKraftig text-[1.4rem]">{comment.comment}</p>
                </main>
                <footer className="flex flex-row justify-between">
                    <section className="flex flex-row gap-5">
                        <div className='flex flex-row cursor-pointer gap-2'>
                            <Heart width={"2rem"} fill={comment.liked ? 'white' : 'transparent'} />
                            <span className="font-testSohneKraftig text-[1.4rem]"> {comment.likes}</span>
                        </div>
                        <div className='flex flex-row cursor-pointer gap-2'>
                            <MessageCircle width={"2rem"} />
                            <span className="font-testSohneKraftig text-[1.4rem]"> {comment.subcomments?.length}</span>
                        </div>
                        <div
                            className='flex flex-row cursor-pointer gap-2 hover:bg-neutral-600 hover:pl-[0.5rem] hover:pr-[0.5rem] hover:rounded-[0.5rem]'
                            onClick={() => handleJumpToAnnotation(comment.annotation.pageIndex, comment.annotation.boundingBox)}
                        >
                            <HighlighterIcon width={"2rem"} />
                            <span className="font-testSohneKraftig text-[1.4rem]"> Highlights</span>
                        </div>
                    </section>

                    <section>
                        <div className='flex flex-row cursor-pointer gap-2'>
                            <Trash width={"2rem"} onClick={() => handleDeleteComment(comment.id)} />
                        </div>
                    </section>
                </footer>
            </div>
            {(comment.subcomments) && recursiveRendering(comment.subcomments, true)}
        </div>
    ))

    return state.comments.length === 0
        ? <h2 className="flex self-center text-[15px]">Rompe el hielo en la discusion!</h2>
        : recursiveRendering(state.comments)

}

export default CommentsViwer;