import * as d3 from 'd3';
import { SVGProps } from 'react';
import { ChartDimensions } from './chart.tsx';

type AxisVerticalProps = {
    dimensions: ChartDimensions;
    scale: any;
    formatTick?: (d: any) => string;
    label?: string;
} & SVGProps<SVGGElement>;

export const AxisVertical = ({
    dimensions,
    label,
    scale,
    formatTick = d3.format(','),
    ...rest
}: AxisVerticalProps) => {
    const numberOfTicks = dimensions.boundedHeight / 70;

    const ticks = scale.ticks(numberOfTicks);

    return (
        <g {...rest} className="axis axis-vertical">
            <line className="axis-line" y2={dimensions.boundedHeight} />

            {ticks.map((tick, i) => (
                <text
                    key={i}
                    className="axis-tick"
                    transform={`translate(-25, ${scale(tick)})`}
                >
                    {formatTick(tick)}
                </text>
            ))}

            {label && (
                <text
                    className="axis-label"
                    transform={`translate(-60, ${dimensions.boundedHeight / 2}) rotate(-90deg)`}
                >
                    {label}
                </text>
            )}
        </g>
    );
};
