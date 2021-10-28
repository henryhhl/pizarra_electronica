
import React, { useEffect } from 'react';
import '../css/diagrama.css';

import { jsPlumb } from 'jsplumb';

export const PizarraVirtualPage = ( props ) => {

    console.log(props)
    console.log(jsPlumb)

    useEffect( () => {
        

    }, [] );

    return (
        <div id="diagramContainer">
            {/* <div className="item diagraR" id="diagram-" data-toggle="tooltip" title="Hola" draggable>
                <div className="espacio"></div>
                <div className="connect"></div>
                <div className="title">
                    <p className="titleDiagram">H1</p>
                </div>
            </div> */}
        </div>
    );
};
