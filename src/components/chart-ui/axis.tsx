import * as d3 from 'd3';
import { AxisVertical } from './axis-vertical.tsx';
import { AxisHorizontal } from './axis-horizontal.tsx';
import { useDimensionsContext } from './chart.tsx';

type AxisProps = {
    dimension: 'x' | 'y';
    scale: any;
    formatTick?: (d: any) => string;
};

const axisByDimension = {
    x: AxisHorizontal,
    y: AxisVertical,
};

export const Axis = ({
    dimension,
    formatTick = d3.format(','),
    ...rest
}: AxisProps) => {
    const dimensions = useDimensionsContext();
    const Component = axisByDimension[dimension];

    if (!Component) return null;

    return (
        <Component dimensions={dimensions} formatTick={formatTick} {...rest} />
    );
};
