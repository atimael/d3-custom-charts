import { useEffect, useMemo, useState } from 'react';
import * as d3 from 'd3';

import { TreeChartData, treechartData } from '../utils/mockData.ts';
import { HierarchyNode } from 'd3';

const data = treechartData;

export const TreeChart = () => {
    const [nodes, setNodes] = useState<HierarchyNode<TreeChartData>[]>([]);
    const [links, setLinks] = useState<HierarchyNode<TreeChartData>[]>([]);
    const [highlightedNodes, setHighlightedNodes] = useState<
        HierarchyNode<TreeChartData>[]
    >([]);

    const colors = d3.schemeCategory10;

    useEffect(() => {
        // set the dimensions and margins of the graph
        const width = 800;
        const height = 800;

        // const cluster = d3.cluster<TreeChartData>().size([width, height - 100]);

        const treeLayout = d3
            .tree<TreeChartData>()
            .size([width, height - 100])
            .separation((a, b) => (a.parent === b.parent ? 1 : 2));

        // Give the data to this cluster layout:
        const root = d3.hierarchy(data);
        treeLayout(root);
        // cluster(root);

        // Extract nodes and links for rendering
        setNodes(root.descendants());
        setLinks(root.descendants().slice(1));
    }, []);

    const getColor = (d: HierarchyNode<TreeChartData>) => {
        // If the parent is the root, return a unique color
        if (d.parent && d.parent?.children && d.parent.depth === 0) {
            const index = d.parent?.children?.indexOf(d);
            return colors[index % colors.length];
        }

        // Otherwise, inherit the color from the closest ancestor that is a root child
        let ancestor = d;
        while (ancestor.parent && ancestor.parent.depth !== 0) {
            ancestor = ancestor.parent;
        }
        return ancestor.parent
            ? colors[
                  (ancestor.parent.children?.indexOf(ancestor) ?? 0) %
                      colors.length
              ]
            : '#ccc';
    };

    const rgbaColor = (color: string) => {
        return (opacity: number) => {
            const rgb = d3.color(color)!.rgb();
            return `rgba(${rgb.r},${rgb.g},${rgb.b},${opacity})`;
        };
    };

    const calculatePath = (link: HierarchyNode<TreeChartData>) => {
        const parent = link.parent;
        const parentDepth = parent?.depth ?? 0;
        const startX = link.x;
        const startY = (link.y ?? 0) - (link.depth >= 1 ? 20 : 0);
        const endX = parent?.x ?? 0;
        const endY =
            (parent?.y ?? 0) +
            (parentDepth === 0 ? 0 : parentDepth <= 1 ? 20 : 40);

        return `
            M${startX},${startY}
            C${startX},${(startY + endY) / 2}
            ${endX},${(startY + endY) / 2}
            ${endX},${endY}
        `;
    };

    // Create a canvas context only once using useMemo
    const canvasContext = useMemo(() => {
        const canvas = document.createElement('canvas');
        return canvas.getContext('2d');
    }, []);

    const applyEllipsis = (
        text: string,
        width: number,
        fontSize = 12,
        fontFamily = 'Arial',
    ) => {
        if (!canvasContext) return text;

        canvasContext.font = `${fontSize}px ${fontFamily}`;
        let textWidth = canvasContext.measureText(text).width;

        if (textWidth <= width) {
            return text;
        } else {
            while (
                canvasContext.measureText(text + '...').width > width &&
                text.length > 0
            ) {
                text = text.slice(0, -1);
            }
            return text + '...';
        }
    };

    const handleMouseEnter = (link: HierarchyNode<TreeChartData>) => {
        // Get all descendants and ancestors of the hovered link
        const descendants = link.descendants();
        const ancestors = link.ancestors();
        const allHighlightedNodes = [...descendants, ...ancestors];

        setHighlightedNodes(allHighlightedNodes);
    };

    const handleMouseLeave = () => {
        setHighlightedNodes([]);
    };

    return (
        <svg width={800} height={800}>
            <g transform="translate(0,40)">
                {links.map((link, index) => (
                    <path
                        key={index}
                        d={calculatePath(link)}
                        style={{
                            fill: 'none',
                            stroke: getColor(link),
                            strokeWidth: highlightedNodes.includes(link)
                                ? 4
                                : 2,
                            cursor: 'pointer',
                            transition: 'stroke-width 0.2s',
                        }}
                        onMouseEnter={() => handleMouseEnter(link)}
                        onMouseLeave={handleMouseLeave}
                    />
                ))}

                {nodes.map((node, index) => {
                    const color = getColor(node);
                    const fill = rgbaColor(color)(0.3);

                    return (
                        <g
                            key={index}
                            transform={`translate(${node.x},${node.y})`}
                            onMouseEnter={() => handleMouseEnter(node)}
                            onMouseLeave={handleMouseLeave}
                            style={{ cursor: 'pointer' }}
                        >
                            {node.depth === 1 ? (
                                <g>
                                    <circle
                                        r={20}
                                        style={{
                                            fill,
                                            stroke: color,
                                            strokeWidth:
                                                highlightedNodes.includes(node)
                                                    ? 4
                                                    : 2,
                                            transition: 'stroke-width 0.2s',
                                        }}
                                    />
                                    <text
                                        x={0}
                                        y={5}
                                        textAnchor="middle"
                                        fontSize={12}
                                        fontFamily="Arial"
                                        fill="black"
                                    >
                                        {applyEllipsis(node.data.name, 35)}
                                    </text>
                                </g>
                            ) : node.depth >= 2 ? (
                                <g>
                                    <circle
                                        cy={-10}
                                        r={10}
                                        style={{
                                            fill,
                                            stroke: color,
                                            strokeWidth:
                                                highlightedNodes.includes(node)
                                                    ? 2
                                                    : 1,
                                            transition: 'stroke-width 0.2s',
                                        }}
                                    />
                                    <rect
                                        x={-50}
                                        y={0}
                                        width={100}
                                        height={40}
                                        rx="5"
                                        style={{
                                            fill,
                                            stroke: color,
                                            strokeWidth:
                                                highlightedNodes.includes(node)
                                                    ? 2
                                                    : 1,
                                            transition: 'stroke-width 0.2s',
                                        }}
                                    />
                                    <text
                                        x={0}
                                        y={25}
                                        textAnchor="middle"
                                        fontSize={12}
                                        fontFamily="Arial"
                                        fill="black"
                                    >
                                        {applyEllipsis(node.data.name, 90)}
                                    </text>
                                </g>
                            ) : null}
                        </g>
                    );
                })}
            </g>
        </svg>
    );
};
