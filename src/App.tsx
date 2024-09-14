import * as d3 from 'd3';
import { Timeline } from './components/charts/timeline.tsx';
import {
    getScatterData,
    getTimelineData,
} from './components/utils/mockData.ts';

import './app.css';
import { TreeChart } from './components/charts/tree.tsx';
import { Flowchart } from './components/charts/flowchart.tsx';
import { useEffect, useState } from 'react';
import { CircleNodes } from './components/charts/test.tsx';

import VerticalOrganizationChart from './OrganizationCharts.tsx';

const getData = () => {
    return {
        timeline: getTimelineData(),
        scatter: getScatterData(),
    };
};

const parseDate = d3.timeParse('%m/%d/%Y');
const dateAccessor = (d: { date: string }) => parseDate(d.date);
const temperatureAccessor = (d: { temperature: number }) => d.temperature;

const data = getData();

function App() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);

    const data = [
        { id: 1, color: 'red' },
        { id: 2, color: 'blue' },
        { id: 3, color: 'green' },
        { id: 4, color: 'yellow' },
        { id: 5, color: 'purple' },
        { id: 6, color: 'red' },
        { id: 7, color: 'blue' },
        { id: 8, color: 'green' },
        { id: 9, color: 'yellow' },
        { id: 10, color: 'aqua' },
        { id: 11, color: 'brown' },
        { id: 12, color: 'black' },
        { id: 13, color: 'silver' },
        { id: 14, color: 'grey' },
    ];

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            setWindowHeight(window.innerHeight);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        // <VerticalOrganizationChart />
        // <CustomTree />
        // <HighchartsReact highcharts={Highcharts} options={options} />
        <div style={{ width: '100%', height: '100%' }}>
            <CircleNodes
                width={windowWidth}
                height={windowHeight}
                data={data}
            />
            <TreeChart />
        </div>
        // <div className="app">
        //     <h1>Custom D3 Charts</h1>
        //
        //     <Flowchart />
        //
        //     {/*<TreeChart />*/}
        //
        //     {/*<Timeline*/}
        //     {/*    data={data.timeline}*/}
        //     {/*    xAccessor={dateAccessor}*/}
        //     {/*    yAccessor={temperatureAccessor}*/}
        //     {/*    label={'Temperature'}*/}
        //     {/*/>*/}
        // </div>
    );
}

export default App;
