import * as d3 from 'd3';

import { useResponsiveChart } from '../hooks/useResponsiveChart.tsx';
import { Chart } from '../chart-ui/chart.tsx';
import { Line } from '../chart-ui/line.tsx';
import { Axis } from '../chart-ui/axis.tsx';

export type TimelineProps = {
    data: { date: string; temperature: number }[];
    xAccessor: (d: { date: string }) => Date | null;
    yAccessor: (d: { temperature: number }) => number;
    label: string;
};

const formatDate = d3.timeFormat('%-b %-d');

export const Timeline = ({ data, xAccessor, yAccessor }: TimelineProps) => {
    const { ref, dimensions } = useResponsiveChart();

    const xScale = d3
        .scaleTime()
        .domain(d3.extent(data, xAccessor))
        .range([0, dimensions.boundedWidth]);

    const yScale = d3
        .scaleLinear()
        .domain(d3.extent(data, yAccessor))
        .range([dimensions.boundedHeight, 0])
        .nice();

    const xAccessorScaled = (d) => xScale(xAccessor(d) ?? -1);
    const yAccessorScaled = (d) => yScale(yAccessor(d));

    return (
        <div className="timeline" ref={ref}>
            <Chart dimensions={dimensions}>
                <Line
                    data={data}
                    xAccessor={xAccessorScaled}
                    yAccessor={yAccessorScaled}
                    interpolation={d3.curveLinear}
                />

                <Axis dimension={'x'} scale={xScale} formatTick={formatDate} />
                <Axis dimension={'y'} scale={yScale} />
            </Chart>
        </div>
    );
};
