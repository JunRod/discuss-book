"use client"

import { useContext, useEffect, useRef, useState } from 'react'
import PSPDFKit from 'pspdfkit'
import { ThemeContext } from './state/context'

const PDFViwer = (props: any) => {

    const { state, dispatch } = useContext(ThemeContext)
    const containerRef = useRef<HTMLDivElement | null>(null)
    const [instanceGlobal, setInstanceGlobal] = useState<any>(null)

    // Load the document once the component mounts.
    useEffect(() => {
        const init = async () => {
            const container = containerRef.current

            if (container && typeof window !== 'undefined') {
                PSPDFKit.unload(container)

                const instance = await PSPDFKit.load({
                    container,
                    document: '/document.pdf',
                    baseUrl: `${window.location.protocol}//${window.location.host}/`,
                })

                setInstanceGlobal(instance)
            }
        }

        init()
    }, [])

    // Remove the default annotation toolbar items.
    useEffect(() => {
        if (instanceGlobal) {
            instanceGlobal.setAnnotationToolbarItems((annotation, { defaultAnnotationToolbarItems }) => {
                if (defaultAnnotationToolbarItems) {
                    // Remove the default annotation toolbar item.
                    return defaultAnnotationToolbarItems.filter((item) =>
                        !['annotation-note', 'spacer', 'color', 'opacity', 'blend-mode'].includes(item.type))
                }

                return defaultAnnotationToolbarItems
            })

            instanceGlobal.setInlineTextSelectionToolbarItems(({ defaultItems }) => {
                const filteredItems = defaultItems.filter((item) => !['highlight', 'strikeout', 'squiggle', 'comment', 'redact-text-highlighter', 'underline'].includes(item.type))
                return filteredItems
            })

            const toolbarItems = instanceGlobal.toolbarItems
            const filteredItems = toolbarItems.filter((item) => !['zoom-mode', 'debug', 'text', 'note', 'stamp', 'image', 'signature', 'ink-eraser', 'text-highlighter', 'annotate', 'spacer', 'highlighter', 'ink', 'callout', 'line', 'link', 'arrow', 'rectangle', 'ellipse', 'polygon', 'cloudy-polygon', 'polyline', 'document-crop', 'export-pdf', 'multi-annotations-selection', 'pan', 'linearized-download-indicator', 'sidebar-annotations', 'sidebar-document-outline', 'sidebar-bookmarks', 'sidebar-signatures', 'sidebar-layers', 'print', 'document-editor'].includes(item.type))
            instanceGlobal.setToolbarItems(filteredItems)

        }
    }, [instanceGlobal])

    const handleSetAnnotation = (annotation: any) => {
        dispatch({ type: 'setAnnotation', payload: annotation });
    };

    const handleSetTextSelected = (textSelected: string) => {
        dispatch({ type: 'setTextSelected', payload: textSelected });
    }

    useEffect(() => {
        const annotations = async () => {
            if (instanceGlobal) {

                // Resalta texto seleccionado
                instanceGlobal.addEventListener("textSelection.change", async (textSelection) => {

                    if (textSelection) {
                        const rectsPerPage = await textSelection.getSelectedRectsPerPage()
                        const comment = await textSelection.getText()

                        // evitamos que se cree un comentario vacio, esto puede suceder al seleccionar un texto que no es texto.
                        if(comment.length == 0) return;

                        rectsPerPage.map(({ pageIndex, rects }) => {

                            // We need to create one annotation per page.
                            const annotation = new PSPDFKit.Annotations.HighlightAnnotation({
                                pageIndex,
                                boundingBox: PSPDFKit.Geometry.Rect.union(rects),
                                rects,
                                id: PSPDFKit.generateInstantId(),
                            })

                            instanceGlobal.create(annotation)

                            handleSetAnnotation(annotation)
                            handleSetTextSelected(comment)
                        })
                    }
                })
              
            }
        }

        annotations()
    }, [instanceGlobal])

    useEffect(() => {

        const deleteAnnotation = async () => {
            if (state.deleteComment) {
                await instanceGlobal.delete(state.deleteComment)
                dispatch({ type: 'deleteComment', payload: null });
            }
        }
        
        const jumpToAnnotation = async () => {
            if (state.jumpToAnnotation) {
                await instanceGlobal.jumpToRect(
                    state.jumpToAnnotation.pageIndex,
                    state.jumpToAnnotation.boundingBox
                )
                dispatch({ type: 'jumpToAnnotation', payload: null });
            }
        }
        
        deleteAnnotation()
        jumpToAnnotation()
    }, [state])

    return <div ref={containerRef} style={{ height: '100vh' }} />
}

export default PDFViwer;