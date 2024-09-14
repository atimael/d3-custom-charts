import { Chart } from '../chart-ui/chart.tsx';
import { useResponsiveChart } from '../hooks/useResponsiveChart.tsx';
import { flowchartData } from '../utils/mockData.ts';
import { HierarchyNode } from 'd3';
import { useCallback, useEffect, useMemo, useState } from 'react';

import * as d3 from 'd3';

const data = flowchartData;

export const Flowchart = () => {
    // const { ref, dimensions } = useResponsiveChart({ width: 800, height: 800 });

    const [nodes, setNodes] = useState<HierarchyNode<typeof data>[]>([]);
    const [links, setLinks] = useState<HierarchyNode<typeof data>[]>([]);
    const [highlightedNodes, setHighlightedNodes] = useState<
        HierarchyNode<typeof data>[]
    >([]);
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const colors = d3.schemeCategory10;

    const updateDimensions = useCallback(() => {
        setDimensions({ width: window.innerWidth, height: window.innerHeight });
    }, []);

    useEffect(() => {
        // Add event listener to handle window resize
        window.addEventListener('resize', updateDimensions);

        return () => {
            // Cleanup event listener on component unmount
            window.removeEventListener('resize', updateDimensions);
        };
    }, [updateDimensions]);

    useEffect(() => {
        const { width, height } = dimensions;

        // Create a custom layout to manually position nodes
        const hierarchy = d3.hierarchy(data);
        const treeLayout = d3.tree<typeof data>().size([height, width]);

        // Apply the layout to the hierarchy
        treeLayout(hierarchy);

        // Custom positioning for each node to dynamically fit within the new dimensions
        const totalDepth = hierarchy.height + 1; // Total levels in the hierarchy
        hierarchy.descendants().forEach((node) => {
            const level = node.depth; // Depth level of the node in the tree
            const siblings = node.parent ? node.parent.children.length : 1; // Number of siblings at this level
            node.x = (level / totalDepth) * width; // X position based on depth
            node.y =
                (node.x / width) * height * (1 - 1 / totalDepth) +
                (level / totalDepth) * height; // Y position for vertical spacing
        });

        setNodes(hierarchy.descendants());
        setLinks(hierarchy.links());
    }, [dimensions]);

    const getColor = (d: HierarchyNode<typeof data>) => {
        return colors[d.depth % colors.length];
    };

    const rgbaColor = (color: string) => {
        return (opacity: number) => {
            const rgb = d3.color(color)!.rgb();
            return `rgba(${rgb.r},${rgb.g},${rgb.b},${opacity})`;
        };
    };

    const calculatePath = (link) => {
        const startX = link.source.x;
        const startY = link.source.y;
        const endX = link.target.x;
        const endY = link.target.y;

        // Create a custom curved path based on node positions
        if (startX === endX) {
            // Vertical line
            return `M${startX},${startY} L${endX},${endY}`;
        } else {
            // Curved path for horizontal or diagonal connections
            return `M${startX},${startY} C${(startX + endX) / 2},${startY} ${(startX + endX) / 2},${endY} ${endX},${endY}`;
        }
    };

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

    const handleMouseEnter = (node: HierarchyNode<typeof data>) => {
        const descendants = node.descendants();
        const ancestors = node.ancestors();
        const allHighlightedNodes = [...descendants, ...ancestors];
        setHighlightedNodes(allHighlightedNodes);
    };

    const handleMouseLeave = () => {
        setHighlightedNodes([]);
    };

    return (
        <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        >
            <g transform="translate(0,0)">
                {links.map((link, index) => (
                    <path
                        key={index}
                        d={calculatePath(link)}
                        style={{
                            fill: 'none',
                            stroke: getColor(link.target),
                            strokeWidth: highlightedNodes.includes(link.target)
                                ? 4
                                : 2,
                            cursor: 'pointer',
                            transition: 'stroke-width 0.2s',
                        }}
                        onMouseEnter={() => handleMouseEnter(link.target)}
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
                            <circle
                                r={15}
                                style={{
                                    fill,
                                    stroke: color,
                                    strokeWidth: highlightedNodes.includes(node)
                                        ? 4
                                        : 2,
                                    transition: 'stroke-width 0.2s',
                                }}
                            />
                            <text
                                x={20}
                                y={5}
                                textAnchor="start"
                                fontSize={12}
                                fontFamily="Arial"
                                fill="black"
                            >
                                {applyEllipsis(node.data.name, 70)}
                            </text>
                            {node.parent && (
                                <text
                                    x={(node.parent.x + node.x) / 2}
                                    y={(node.parent.y + node.y) / 2 - 10}
                                    textAnchor="middle"
                                    fontSize={10}
                                    fill="black"
                                >
                                    {node.data.time}
                                </text>
                            )}
                        </g>
                    );
                })}
            </g>
        </svg>
    );
};
