import { useState, useEffect, useCallback } from 'react';

export const CircleNodes = ({ width, height, data }) => {
    const [nodes, setNodes] = useState([]);
    const [lines, setLines] = useState([]); // State to hold line data

    // Function to calculate positions based on available width
    const calculateNodePositions = useCallback(() => {
        const nodeSize = 50; // Diameter of the circle
        const margin = 80; // Margin around the circle
        const fullNodeWidth = nodeSize + margin; // Full width of a node including margin

        let currentX = margin;
        let currentY = margin + nodeSize / 2;
        let direction = 1; // 1 for left to right, -1 for right to left

        const updatedNodes = data.map((d, i) => {
            const newNode = {
                ...d,
                x: currentX + nodeSize / 2,
                y: currentY,
            };

            // Increment x position by full width of node
            currentX += fullNodeWidth * direction;

            // Check if the next node would exceed the available width (including margin)
            if (
                (direction === 1 && currentX + nodeSize > width) ||
                (direction === -1 && currentX - margin < 0)
            ) {
                // Move y down by one node height plus margin
                currentY += fullNodeWidth;
                // Flip direction
                direction *= -1;
                // Align currentX directly under the last node in the new row based on direction
                currentX =
                    direction === 1
                        ? margin
                        : newNode.x +
                          direction * (fullNodeWidth / 2 - margin / 2);
            }

            return newNode;
        });

        // const updatedLines = updatedNodes.slice(1).map((node, index) => ({
        //     x1: updatedNodes[index].x,
        //     y1: updatedNodes[index].y,
        //     x2: node.x,
        //     y2: node.y,
        // }));
        let directionPath = 1;
        const updatedPaths = updatedNodes.slice(1).map((node, index) => {
            const prevNode = updatedNodes[index];

            if (node.y !== prevNode.y) {
                directionPath *= -1; // Flip direction for each new row
            }

            // Calculate the edge points
            const startX =
                directionPath === 1
                    ? prevNode.x + nodeSize / 2
                    : prevNode.x - nodeSize / 2;

            const startY = prevNode.y;
            const endX =
                directionPath === 1
                    ? node.x - nodeSize / 2
                    : node.x + nodeSize / 2;
            const endY = node.y;

            // Calculate control points for smooth curves
            const midX = (startX + endX) / 2;
            const cpx1 = directionPath === 1 ? midX : midX;
            const cpy1 = startY + (endY - startY) / 2; // Control points for an outward curve
            const cpx2 = directionPath === 1 ? midX : midX;
            const cpy2 = startY + (endY - startY) / 2; // Control points for an outward curve

            console.log('startX', [
                node,
                directionPath,
                startX,
                endX,
                updatedNodes[index - 1],
            ]);

            //M 80,235 C 80,235 30,300 80,365
            return {
                d: `M ${startX},${startY} C ${cpx1},${cpy1} ${cpx2},${cpy2} ${endX},${endY}`,
            };
        });

        // let directionPath = 1; // Reset direction for path calculation
        // const updatedPaths = updatedNodes.slice(1).map((node, index) => {
        //     const prevNode = updatedNodes[index];
        //
        //     // Determine if direction needs to change (when starting a new row)
        //     if (node.y !== prevNode.y) {
        //         directionPath *= -1; // Flip direction for each new row
        //     }
        //
        //     // Calculate the edge points for both directions
        //     const startX =
        //         directionPath === 1
        //             ? prevNode.x + nodeSize / 2
        //             : prevNode.x - nodeSize / 2;
        //     const endX =
        //         directionPath === 1
        //             ? node.x - nodeSize / 2
        //             : node.x + nodeSize / 2;
        //     const startY = prevNode.y;
        //     const endY = node.y;
        //
        //     // Calculate control points for smooth curves
        //     const controlOffsetX = 0.5 * Math.abs(endX - startX); // 50% of the horizontal distance
        //     const controlOffsetY = 0.5 * Math.abs(endY - startY); // 50% of the vertical distance
        //
        //     const cpx1 =
        //         startX +
        //         (directionPath === 1 ? controlOffsetX : -controlOffsetX);
        //     const cpy1 = startY; // Keep control point aligned vertically with start
        //     const cpx2 =
        //         endX + (directionPath === 1 ? -controlOffsetX : controlOffsetX);
        //     const cpy2 = endY; // Keep control point aligned vertically with end
        //
        //     return {
        //         d: `M ${startX},${startY} C ${cpx1},${cpy1} ${cpx2},${cpy2} ${endX},${endY}`,
        //     };
        // });

        setNodes(updatedNodes);
        setLines(updatedPaths);
    }, [width, data]);

    useEffect(() => {
        calculateNodePositions();
    }, [width, data, calculateNodePositions]);

    // Add an event listener to handle window resize
    useEffect(() => {
        const handleResize = () => {
            calculateNodePositions();
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [calculateNodePositions]);

    return (
        <svg width={width} height={height}>
            {/*{lines.map((line, index) => (*/}
            {/*    <line*/}
            {/*        key={index}*/}
            {/*        x1={line.x1}*/}
            {/*        y1={line.y1}*/}
            {/*        x2={line.x2}*/}
            {/*        y2={line.y2}*/}
            {/*        stroke="black"*/}
            {/*        strokeWidth="2"*/}
            {/*    />*/}
            {/*))}*/}

            {lines.map((path, index) => (
                <path
                    key={index}
                    d={path.d}
                    fill="none"
                    stroke="black"
                    strokeWidth="2"
                />
            ))}

            {nodes.map((node, index) => (
                <circle
                    key={index}
                    cx={node.x}
                    cy={node.y}
                    r={25} // Radius of the circle
                    fill={node.color || 'steelblue'}
                />
            ))}
        </svg>
    );
};
