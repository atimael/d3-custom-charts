import { createContext, ReactNode, useContext } from 'react';

import './chart.css';

export type ChartDimensions = {
    boundedHeight: number;
    boundedWidth: number;
    height: number;
    marginBottom: number;
    marginLeft: number;
    marginRight: number;
    marginTop: number;
    width: number;
};

type ChartProps = {
    dimensions?: ChartDimensions;
    children?: ReactNode;
};

const ChartContext = createContext({} as ChartDimensions);

export const useDimensionsContext = () => useContext(ChartContext);

export const Chart = ({ dimensions, children }: ChartProps) => {
    return (
        <ChartContext.Provider value={dimensions ?? ({} as ChartDimensions)}>
            <svg
                className="chart"
                width={dimensions?.width}
                height={dimensions?.height}
            >
                <g
                    transform={`translate(${dimensions?.marginLeft ?? 0}, ${dimensions?.marginTop ?? 0})`}
                >
                    {children}
                </g>
            </svg>
        </ChartContext.Provider>
    );
};
