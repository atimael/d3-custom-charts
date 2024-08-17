import * as d3 from 'd3';

type LineProps = {
    data: any[];
    type?: 'line' | 'area';
    xAccessor: (d: any) => number;
    yAccessor: (d: any) => number;
    y0Accessor?: number;
    interpolation?: d3.CurveFactory;

    [key: string]: any;
};

export const Line = ({
    data,
    type = 'line',
    xAccessor,
    yAccessor,
    y0Accessor = 0,
    interpolation = d3.curveMonotoneX,
    ...rest
}: LineProps) => {
    let generator;

    if (type === 'area') {
        generator = d3
            .area()
            .x(xAccessor)
            .y0(y0Accessor)
            .y1(yAccessor)
            .curve(interpolation);
    } else {
        generator = d3.line().x(xAccessor).y(yAccessor).curve(interpolation);
    }

    const line = generator(data) ?? undefined;

    return <path {...rest} className={`line-${type}`} d={line} />;
};
