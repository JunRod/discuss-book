'use client';

import { /* useCallback, useMemo,  */useCallback, useState } from 'react';
// import { useResizeObserver } from '@wojtekmaj/react-hooks';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

import type { PDFDocumentProxy } from 'pdfjs-dist';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

// const resizeObserverOptions = {};

const maxWidth = 800;

type PDFFile = string | File | null;

function highlightPattern(text, pattern) {
    return text.replace(pattern, (value) => `<mark>${value}</mark>`);
}

export default function Sample() {
    const [file, setFile] = useState<PDFFile>('./test.pdf');
    const [numPages, setNumPages] = useState<number>();
    const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
    const [containerWidth, setContainer] = useState<number>();

    // const options = useMemo(() => ({
    //     cMapUrl: '/cmaps/',
    //     standardFontDataUrl: '/standard_fonts/',
    // }), []);

    // const onResize = useCallback<ResizeObserverCallback>((entries) => {
    //     const [entry] = entries;

    //     if (entry) {
    //         setContainerWidth(entry.contentRect.width);
    //     }
    // }, []);

    // useResizeObserver(containerRef, resizeObserverOptions, onResize);

    const [searchText, setSearchText] = useState('');

    const textRenderer = useCallback(
        (textItem) => highlightPattern(textItem.str, searchText),
        [searchText]
    );

    function onChange(event) {
        setSearchText(event.target.value);
    }

    function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy): void {
        setNumPages(nextNumPages);
    }

    return (
        // <div className="h-full w-full" ref={setContainerRef}>
        <>
            <div>
                <label htmlFor="search">Search:</label>
                <input type="search" id="search" value={searchText} onChange={onChange} />
            </div>
            <Document file={file} onLoadSuccess={onDocumentLoadSuccess} /* options={options} */>
                {Array.from(new Array(numPages), (_el, index) => (
                    <Page
                        key={`page_${index + 1}`}
                        pageNumber={index + 1}
                        width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
                        customTextRenderer={textRenderer}
                    />
                ))}
            </Document>

        </>
    );
}