import * as d3 from 'd3';

const randomAroundMean = (mean: number, deviation: number) =>
    mean + boxMullerRandom() * deviation;
const boxMullerRandom = () => {
    return (
        Math.sqrt(-2 * Math.log(Math.random())) *
        Math.cos(2 * Math.PI * Math.random())
    );
};

const today = new Date();
const formatDate = d3.timeFormat('%m/%d/%Y');

export const getTimelineData = (length = 100) => {
    let lastTemperature = randomAroundMean(70, 20);
    const firstTemperature = d3.timeDay.offset(today, -length);

    return new Array(length).fill(0).map((_, i) => {
        lastTemperature += randomAroundMean(0, 2);

        return {
            date: formatDate(d3.timeDay.offset(firstTemperature, i)),
            temperature: lastTemperature,
        };
    });
};

export const getScatterData = (count = 100) => {
    return new Array(count).fill(0).map(() => {
        return {
            temperature: randomAroundMean(70, 20),
            humidity: randomAroundMean(0.5, 0.1),
        };
    });
};

type TreeChartNode = {
    name: string;
    children?: TreeChartNode[];
};

export type TreeChartData = {
    name: string;
    children?: TreeChartNode[];
};

export const treechartData: TreeChartData = {
    name: 'root',
    children: [
        {
            name: '777323',
            children: [
                {
                    name: 'Play | Call Monitor',
                    children: [
                        {
                            name: 'Check ANI | Check Bill ph...',
                            children: [
                                {
                                    name: 'Exit Point | Contact not available',
                                    children: [
                                        {
                                            name: 'Get Value | Get you Bill',
                                            children: [
                                                { name: 'Caller | Hangup' },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: '7773',
            children: [
                {
                    name: 'Play | Call Monitor',
                    children: [
                        {
                            name: 'Check ANI | Check Bill phone number',
                            children: [
                                {
                                    name: 'Exit Point | Contact not available',
                                    children: [
                                        {
                                            name: 'Get Value | Get you Bill',
                                            children: [
                                                { name: 'Caller | Hangup' },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: '7',
            children: [
                {
                    name: 'Play | Call Monitor',
                    children: [
                        {
                            name: 'Check ANI | Check Bill phone number',
                            children: [
                                {
                                    name: 'Exit Point | Contact not available',
                                    children: [
                                        {
                                            name: 'Get Value | Get you Bill',
                                            children: [
                                                { name: 'Caller | Hangup' },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },

        {
            name: '777232323',
            children: [
                {
                    name: 'Play | Call Monitor',
                    children: [
                        {
                            name: 'Check ANI | Check Bill phone number',
                            children: [
                                {
                                    name: 'Exit Point | Contact not available',
                                    children: [
                                        {
                                            name: 'Get Value | Get you Bill',
                                            children: [
                                                { name: 'Caller | Hangup' },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
};
