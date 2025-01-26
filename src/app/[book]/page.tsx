import InputComments from "@/src/components/InputComment";
import CommentsViwer from "./CommentsViwer";
// import PDFViwer from "./PDFViwer";
import PDFViwerV4 from "./PDFViwerV4";

export default function HubDiscussion() {

    return (
        <div id="archive" className="h-[90%] w-[160rem] self-center overflow-hidden flex flex-col">
            <h1 id="archive-title" className="h-[5%] font-testSohneBuch text-[2rem]">NO TENGO SUFICIENTE FE PARA SER UN ATEO - Norman L. Geisler, Frank Turek, David Limbaugh</h1>

            <div id="archive-container-source-comments" className="h-[95%] w-full flex flex-row gap-10">
                <div id="archive-container-source" className="h-full w-full bg-neutral-900 rounded-[1rem]">
                    <PDFViwerV4 />
                </div>

                <div id="archive-container-comments" className="relative h-full w-[90rem] flex flex-col gap-[2rem] rounded-[1rem] p-[2rem] overflow-y-auto bg-neutral-900">
                    <CommentsViwer />
                    <InputComments />
                </div>
            </div>
        </div>
    )
}