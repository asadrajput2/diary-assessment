import React from 'react';

function getLegend(legendName) {
    let legend = "";
    switch (legendName) {
        case "protein treatment":
            legend = <span className="tile-legend-item Pr">Pr</span>;
            break;
        case "hair cut":
            legend = <span className="tile-legend-item Cu">Cu</span>;
            break;
        case "hair color":
            legend = <span className="tile-legend-item HC">HC</span>;
            break;
        case "deep conditioning":
            legend = <span className="tile-legend-item DC">Dc</span>;
            break;
        case "clarifying":
            legend = <span className="tile-legend-item C">C</span>;
            break;
    }
    return legend;
}

export default function Legends({ typeofday }) {

    return (
        <div className="tile-legends">
            <ul className="list-inline">
                {
                    typeofday.map(type =>
                        <li key={type} className="list-inline-item">
                            {getLegend(type)}
                        </li>
                    )
                }
            </ul>
        </div>

    )
}