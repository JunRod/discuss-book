'use client'

import {
    PdfViewerComponent, Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView,
    ThumbnailView, Print, TextSelection, Annotation, TextSearch, FormFields, FormDesigner, Inject
} from '@syncfusion/ej2-react-pdfviewer';
import { registerLicense } from '@syncfusion/ej2-base';
import { ToolbarComponent, ItemsDirective, ItemDirective, ClickEventArgs } from '@syncfusion/ej2-react-navigations';

import '../../../node_modules/@syncfusion/ej2-base/styles/material.css';
import '../../../node_modules/@syncfusion/ej2-buttons/styles/material.css';
import '../../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css';
import '../../../node_modules/@syncfusion/ej2-inputs/styles/material.css';
import '../../../node_modules/@syncfusion/ej2-navigations/styles/material.css';
import '../../../node_modules/@syncfusion/ej2-popups/styles/material.css';
import '../../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css';
import "../../../node_modules/@syncfusion/ej2-pdfviewer/styles/material.css";
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from './state/context';


registerLicense('Ngo9BigBOggjHTQxAR8/V1NMaF5cXmBCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdmWX5fcXVSRGNdVUFwV0A=');

const PDFViwerV4 = () => {

    const { state, dispatch } = useContext(ThemeContext)
    const [annotationSelected, setAnnotationSelected] = useState(true);
    let viewer: PdfViewerComponent;
    let toolbar: ToolbarComponent;

    function clickHandler(args: ClickEventArgs) {
        switch (args.item.id) {
            case 'file_Open':
                {
                    let fileUpload = document.getElementById(
                        'fileUpload'
                    ) as HTMLInputElement;
                    fileUpload.click();
                }
                break;
            case 'highlights':
                viewer.annotationModule.setAnnotationMode('Highlight');
                viewer.annotationModule.setAnnotationMode('None')
                break;
            default:
                break;
        }
    }

    const annotationAdd = (event: any) => {
        dispatch({ type: 'setAnnotation', payload: event });
    }

    const annotationSelect = (event: any) => {
        if (event.textContent?.length > 0) setAnnotationSelected(false);
    }

    // cuando hacemos click en la pagina en la que estamos, disablamos la opcion de seleccionar anotaciones
    const pageClick = (event: any) => {
        setAnnotationSelected(true);
    }

    const deleteAnnotation = () => {
        if (!state.deleteComment) return;
        viewer.annotationModule.deleteAnnotationById(state.deleteComment);
        dispatch({ type: 'deleteComment', payload: null })

    }

    useEffect(() => {
        const setInstancePDF = () => {
            if (!viewer) return;
            dispatch({ type: 'setInstancePDF', payload: viewer });
        }

        setInstancePDF()
    }, [])


    useEffect(() => {
        deleteAnnotation()
    }, [state])


    return (
        <>
            <div className='e-pdfviewer'>
                <ToolbarComponent
                    ref={(scope) => { toolbar = scope as ToolbarComponent; }}
                    clicked={clickHandler.bind(this)}
                >
                    <ItemsDirective>
                        <ItemDirective disabled={annotationSelected} prefixIcon="e-pv-highlight-icon" id="highlights" tooltipText="Highlight"></ItemDirective>
                    </ItemsDirective>
                </ToolbarComponent>
            </div>
            <PdfViewerComponent
                enableToolbar={false}
                textSelectionEnd={annotationSelect}
                enableNavigationToolbar={false}
                enableAnnotationToolbar={false}
                enableCommentPanel={false}
                pageClick={pageClick}
                annotationAdd={annotationAdd}
                highlightSettings={{
                    enableMultiPageAnnotation: false,
                }}
                id="container"
                ref={(scope) => { viewer = scope as PdfViewerComponent; }}
                documentPath="https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf"
                resourceUrl="https://cdn.syncfusion.com/ej2/26.2.11/dist/ej2-pdfviewer-lib"
                style={{ 'height': '100%' }}
                toolbarSettings={{
                    showTooltip: true,
                    toolbarItems: ['PageNavigationTool', 'AnnotationEditTool', 'SearchOption'],
                    annotationToolbarItems: ['HighlightTool'],
                    formDesignerToolbarItems: [],
                }}
            >
                <Inject services={[Toolbar, Annotation, TextSelection, TextSearch]} />
            </PdfViewerComponent>
        </>
    )

}

export default PDFViwerV4;