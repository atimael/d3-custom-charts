import * as d3 from 'd3';
import { Timeline } from './components/charts/timeline.tsx';
import {
    getScatterData,
    getTimelineData,
} from './components/utils/mockData.ts';

import './app.css';
import { TreeChart } from './components/charts/tree.tsx';

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
    return (
        <div className="app">
            <h1>Custom D3 Charts</h1>

            <TreeChart />

            <Timeline
                data={data.timeline}
                xAccessor={dateAccessor}
                yAccessor={temperatureAccessor}
                label={'Temperature'}
            />
        </div>
    );
}

export default App;
