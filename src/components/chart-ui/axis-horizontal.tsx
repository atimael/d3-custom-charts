import * as d3 from 'd3';
import { SVGProps } from 'react';
import { ChartDimensions } from './chart.tsx';

type AxisHorizontalProps = {
    dimensions: ChartDimensions;
    scale: any;
    formatTick?: (d: any) => string;
    label?: string;
} & SVGProps<SVGGElement>;

export const AxisHorizontal = ({
    dimensions,
    label,
    scale,
    formatTick = d3.format(','),
    ...rest
}: AxisHorizontalProps) => {
    const numberOfTicks =
        dimensions.boundedWidth < 600
            ? dimensions.boundedWidth / 100
            : dimensions.boundedWidth / 250;

    const ticks = scale.ticks(numberOfTicks);

    return (
        <g
            {...rest}
            className="axis axis-horizontal"
            transform={`translate(0, ${dimensions.boundedHeight})`}
        >
            <line className="axis-line" x2={dimensions.boundedWidth} />

            {ticks.map((tick, i) => (
                <text
                    key={i}
                    className="axis-tick"
                    transform={`translate(${scale(tick)}, 25)`}
                >
                    {formatTick(tick)}
                </text>
            ))}

            {label && (
                <text
                    className="axis-label"
                    transform={`translate(${dimensions.boundedWidth / 2}, 60)`}
                >
                    {label}
                </text>
            )}
        </g>
    );
};
