import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
// import Sankey from 'highcharts/modules/sankey';
// import Organization from 'highcharts/modules/organization';
import Networkgrapgh from 'highcharts/modules/networkgraph';

try {
    // Sankey(Highcharts);
    // Organization(Highcharts);
    Networkgrapgh(Highcharts);
} catch (e) {
    console.error('EEEEEE graph error: ', e);
}
// const VerticalOrganizationChart = () => {
//     const options = {
//         chart: {
//             height: 1200,
//             inverted: true,
//         },
//         title: {
//             text: 'The Germanic Language Tree',
//         },
//
//         accessibility: {
//             point: {
//                 descriptionFormat:
//                     '{add index 1}. {toNode.id}' + 'comes from {fromNode.id}',
//             },
//         },
//
//         tooltip: {
//             outside: true,
//         },
//         series: [
//             {
//                 name: 'Germanic language tree',
//                 type: 'organization',
//                 keys: ['from', 'to'],
//                 nodeWidth: 40,
//                 nodePadding: 20,
//                 colorByPoint: false,
//                 hangingIndentTranslation: 'cumulative',
//                 // Crimp a bit to avoid nodes overlapping lines
//                 hangingIndent: 10,
//
//                 levels: [
//                     {
//                         level: 0,
//                         color: '#dedede',
//                     },
//                     {
//                         level: 1,
//                         color: '#dedede',
//                     },
//                     {
//                         level: 2,
//                         color: '#dedede',
//                     },
//                     {
//                         level: 3,
//                         color: '#dedede',
//                     },
//                     {
//                         level: 4,
//                         color: '#dedede',
//                     },
//                 ],
//                 nodes: [
//                     {
//                         id: 'child-node1',
//                         name: 'First Child',
//                         layout: 'hanging',
//                         color: '#d35454',
//                     },
//                     {
//                         id: 'child-node2',
//                         name: 'Second Child',
//                         layout: 'hanging',
//                         color: '#d752ff',
//                     },
//                     {
//                         id: 'ccn1-1',
//                         name: 'Play | Call Monitor',
//                         color: '#f39c12',
//                     },
//                     {
//                         id: 'ccn1-2',
//                         name: 'Check ANI | Check Bill',
//                         color: '#f39c12',
//                     },
//                     {
//                         id: 'ccn1-3',
//                         name: 'Exit Point | Contact not...',
//                         color: '#f39c12',
//                     },
//                     {
//                         id: 'ccn1-4',
//                         name: 'Get Value | Get you Bill...',
//                         color: '#f39c12',
//                     },
//                     {
//                         id: 'ccn1-5',
//                         name: 'Caller | Hangup',
//                         color: '#f39c12',
//                     },
//                     {
//                         id: 'ccn2-1',
//                         name: 'Opa Call',
//                         color: '#f39c12',
//                     },
//                 ],
//                 data: [
//                     ['root', 'child-node1'],
//                     ['child-node1', 'ccn1-1'],
//                     ['child-node1', 'ccn1-2'],
//                     ['child-node1', 'ccn1-3'],
//                     ['child-node1', 'ccn1-4'],
//                     ['child-node1', 'ccn1-5'],
//
//                     ['root', 'child-node2'],
//                     ['child-node2', 'ccn2-1'],
//                 ],
//             },
//         ],
//     };
//
//     return <HighchartsReact highcharts={Highcharts} options={options} />;
// };

// export default VerticalOrganizationChart;

const VerticalOrganizationChart = () => {
    // const [chartWidth, setChartWidth] = useState(window.innerWidth);
    //
    // useEffect(() => {
    //     const handleResize = () => {
    //         setChartWidth(window.innerWidth);
    //     };
    //
    //     window.addEventListener('resize', handleResize);
    //     return () => {
    //         window.removeEventListener('resize', handleResize);
    //     };
    // }, []);

    const options = {
        chart: {
            type: 'networkgraph',
            height: 600,
            width: 500,
        },
        title: {
            text: 'Zig-Zag Flow Chart',
        },
        plotOptions: {
            networkgraph: {
                keys: ['from', 'to'],
                layoutAlgorithm: {
                    enableSimulation: false,
                    linkLength: 120,
                    gravitationalConstant: 0.06,
                },
                marker: {
                    radius: 20,
                },
                dataLabels: {
                    enabled: true,
                    linkFormat: '{point.fromNode.name} → {point.toNode.name}',
                },
            },
        },
        series: [
            {
                data: [
                    { from: 'Ringing', to: 'IVR Answered' },
                    { from: 'IVR Answered', to: 'IVR Script' },
                    { from: 'IVR Script', to: 'Menu' },
                    { from: 'Menu', to: 'Digit Pressed' },
                    { from: 'Digit Pressed', to: 'Exit Point' },
                ],
                nodes: [
                    {
                        id: 'Ringing',
                        marker: {
                            radius: 20,
                        },
                        color: '#3498db',
                    },
                    {
                        id: 'IVR Answered',
                        marker: {
                            radius: 20,
                        },
                        color: '#e74c3c',
                    },
                    {
                        id: 'IVR Script',
                        marker: {
                            radius: 20,
                        },
                        color: '#f39c12',
                    },
                    {
                        id: 'Menu',
                        marker: {
                            radius: 20,
                        },
                        color: '#9b59b6',
                    },
                    {
                        id: 'Digit Pressed',
                        marker: {
                            radius: 20,
                        },
                        color: '#2ecc71',
                    },
                    {
                        id: 'Exit Point',
                        marker: {
                            radius: 20,
                        },
                        color: '#e67e22',
                    },
                ],
            },
        ],
    };

    return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default VerticalOrganizationChart;
