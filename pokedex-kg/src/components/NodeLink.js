import data from "../assets/pokedex.json";
import * as d3 from "d3";
import { useContext, useEffect } from 'react';
import { selectedItemContext } from "./MainBoard";

function NodeLink() {
    // eslint-disable-next-line
    const {selectedItem, setSelectedItem} = useContext(selectedItemContext);
    function findNode(nodes, x, y, radius) {
        const rSq = radius * radius;
        let i;
        for (i = nodes.length - 1; i >= 0; --i) {
            const node = nodes[i],
                    dx = x - node.x,
                    dy = y - node.y,
                    distSq = (dx * dx) + (dy * dy);
            if (distSq < rSq) {
                return node;
            }
        }
        // No node selected
        return undefined; 
    };
    function forceSimulation(width, height) {
        return d3.forceSimulation()
            .force("center", d3.forceCenter(width / 2, height / 2))
            .force("charge", d3.forceManyBody())
            .force("link", d3.forceLink().id(d => d.id))
    };
    function drawDiagramCanvas(id, data, height, width) {
        let nodeRadius = 3;
        const nodeRadiusDefault = 3;
        const colorNode = d3.schemeCategory10.slice(0, 5);
        const colorLink = d3.schemeCategory10.slice(5, 10);
        let expandedNodes = [];
        let nodeSizePokemon = '1';
        let nodeSizeOther = '1';

        const canvas = d3.select(id).append('canvas')
        .attr('width', width)
        .attr('height', height)
        .node();

        const ctx = canvas.getContext('2d');

        const simulation = forceSimulation(width, height);
        let transform = d3.zoomIdentity;

        // The simulation will alter the input data objects so make
        // copies to protect the originals.
        const nodes = data.nodes.map(d => Object.assign({}, d));
        const edges = data.links.map(d => Object.assign({}, d));

        d3.select(canvas)
            .call(d3.drag()
                // Must set this in order to drag nodes. New in v5?
                .container(canvas)
                .subject(dragSubject)
                .on('start', dragStarted)
                .on('drag', dragged)
                .on('end', dragEnded))
            .call(d3.zoom()
                .scaleExtent([1 / 10, 8])
                .on('zoom', zoomed))
            .on("dblclick.zoom", null);

        simulation.nodes(nodes)
            .on("tick", simulationUpdate);
        simulation.force("link")
            .links(edges);
        simulation.force("link").distance(30);
        simulation.force("charge").strength(-30);

        function zoomed(e) {
            transform = e.transform;
            simulationUpdate();
        }
        
        /** Find the node that was clicked, if any, and return it. */
        let dblclickTimer = false;
        function dragSubject(e) {
            const x = transform.invertX(e.x),
                y = transform.invertY(e.y);
            const node = findNode(nodes, x, y, 5);
            if (node) {
                node.x =  transform.applyX(node.x);
                node.y = transform.applyY(node.y);
                if(dblclickTimer) {
                    clearTimeout(dblclickTimer);
                    dblclickTimer = false;
                    // double click expand/recover node
                    if (expandedNodes.includes(node.id)) {
                        expandedNodes = expandedNodes.filter(function(value){
                            return value !== node.id;
                        });
                    } else {
                        expandedNodes = [...expandedNodes, node.id];
                    }
                } else {
                    // click show details
                    dblclickTimer = setTimeout(function() {
                        dblclickTimer = false;
                        setSelectedItem(node);
                    }, 250);
                }
            }
            // else: No node selected, drag container
            return node;
        }

        function dragStarted(e) {
            if (!e.active) {
                simulation.alphaTarget(0.3).restart();
            }
            e.subject.fx = transform.invertX(e.x);
            e.subject.fy = transform.invertY(e.y);
        }

        function dragged(e) {
            e.subject.fx = transform.invertX(e.x);
            e.subject.fy = transform.invertY(e.y);
        }

        function dragEnded(e) {
            if (!e.active) {
                simulation.alphaTarget(0);
            }
            e.subject.fx = null;
            e.subject.fy = null;
        }

        d3.select(".ant-input-search-button").on("click", () => {
            let newName = d3.select("#search").node().value;
            nodes.forEach(function(d, i) {
                if (newName === d.attr.name) {
                    if (!expandedNodes.includes(i)) {
                        expandedNodes = [...expandedNodes, i];
                    }
                    setSelectedItem(d);
                }
            });
        })

        let minTotalStats = 720;
        let maxTotalStats = 0;
        // max(atk, sp_atk) + speed
        let minAtkStats = 720;
        let maxAtkStats = 0;
        // hp + def + sp_def
        let minTankStats = 720;
        let maxTankStats = 0;
        nodes.forEach(function(d) {
            d.degree = 0;
            if (d.group === 0) {
                d.totalStats = parseInt(d.attr.hp) + parseInt(d.attr.attack) + parseInt(d.attr.defense) + parseInt(d.attr.sp_attack) + parseInt(d.attr.sp_defense) + parseInt(d.attr.speed);
                d.atkStats = Math.max(parseInt(d.attr.attack), parseInt(d.attr.sp_attack)) + parseInt(d.attr.speed);
                d.tankStats = parseInt(d.attr.hp) + parseInt(d.attr.defense) + parseInt(d.attr.sp_defense);
                if (d.totalStats > maxTotalStats) {
                    maxTotalStats = d.totalStats;
                }
                if (d.totalStats < minTotalStats) {
                    minTotalStats = d.totalStats;
                }
                if (d.atkStats > maxAtkStats) {
                    maxAtkStats = d.atkStats;
                }
                if (d.atkStats < minAtkStats) {
                    minAtkStats = d.atkStats;
                }
                if (d.tankStats > maxTankStats) {
                    maxTankStats = d.tankStats;
                }
                if (d.tankStats < minTankStats) {
                    minTankStats = d.tankStats;
                }
            }
        });
        edges.forEach(function(d) {
            d.source.degree += 1;
            d.target.degree += 1;
        });
        let minDegree = d3.min(
            Object.values(nodes), function(d) {
                return d.degree;
            })
        
        let maxDegree = d3.max(
            Object.values(nodes), function(d) { 
                return d.degree;
            })
        let nodescale = d3.scaleSqrt()
        .domain( [minDegree, maxDegree] )
        .range( [2, 10] );
        let nodescaleStats = d3.scaleSqrt()
        .domain( [minTotalStats, maxTotalStats] )
        .range( [2, 10] );
        let nodescaleAtkStats = d3.scaleSqrt()
        .domain( [minAtkStats, maxAtkStats] )
        .range( [2, 10] );
        let nodescaleTankStats = d3.scaleSqrt()
        .domain( [minTankStats, maxTankStats] )
        .range( [2, 10] );
        
        // customization
        d3.select("#slider-charge").on("input", () => {
            let d = d3.select("#slider-charge").node().value;
            simulation.force("charge").strength(d);
            simulation.alphaTarget(0.3).restart();
        });
        d3.select("#slider-dis").on("input", () => {
            let d = d3.select("#slider-dis").node().value;
            simulation.force("link").distance(d);
            simulation.alphaTarget(0.3).restart();
        });
        d3.select('#nsize-p').on('change', function() {
            nodeSizePokemon = d3.select(this).property('value');
            simulationUpdate();
        });
        d3.select('#nsize-o').on('change', function() {
            nodeSizeOther = d3.select(this).property('value');
            simulationUpdate();
        });


        // update render
        function simulationUpdate() {
            let opacityNodes = [];
            ctx.save();
            ctx.clearRect(0, 0, width, height);
            ctx.translate(transform.x, transform.y);
            ctx.scale(transform.k, transform.k);
            // Draw edges
            edges.forEach(function(d) {
                if (expandedNodes.includes(d.source.id) || expandedNodes.includes(d.target.id)) {
                    opacityNodes.push(d.source.id)
                    opacityNodes.push(d.target.id)
                    ctx.strokeStyle = colorLink[d.group];
                    ctx.beginPath();
                    ctx.moveTo(d.source.x, d.source.y);
                    ctx.lineTo(d.target.x, d.target.y);
                    ctx.lineWidth = Math.sqrt(d.value);
                    ctx.stroke();
                }
            });
            // Draw nodes
            nodes.forEach(function(d, i) {
                ctx.beginPath();
                // customize node size
                if (d.group === 0) {
                    // Pokemon
                    if (nodeSizePokemon === '0') {
                        nodeRadius = nodescale(d.degree);
                    } else if (nodeSizePokemon === '1') {
                        nodeRadius = nodeRadiusDefault;
                    } else if (nodeSizePokemon === '2') {
                        nodeRadius = nodescaleStats(d.totalStats);
                    } else if (nodeSizePokemon === '3') {
                        nodeRadius = nodescaleAtkStats(d.atkStats);
                    } else {
                        nodeRadius = nodescaleTankStats(d.tankStats);
                    }
                } else {
                    // Other
                    if (nodeSizeOther === '0') {
                        nodeRadius = nodescale(d.degree);
                    } else {
                        nodeRadius = nodeRadiusDefault;
                    }
                }
                // Node fill
                if (opacityNodes.length === 0 || opacityNodes.includes(i)) {
                    ctx.globalAlpha = 1;
                } else {
                    ctx.globalAlpha = 0.3;
                }
                ctx.moveTo(d.x + nodeRadius, d.y);
                ctx.arc(d.x, d.y, nodeRadius, 0, 2 * Math.PI);
                ctx.fillStyle = colorNode[d.group];
                ctx.fill();
                // Node outline
                if (expandedNodes.includes(i)){
                    ctx.strokeStyle = 'red';
                    ctx.lineWidth = '2.5';
                } else {
                    ctx.strokeStyle = '#fff';
                    ctx.lineWidth = '1.0';
                }
                ctx.stroke();
            });
            ctx.restore();
        }
    };
    // function drawDiagramSVG(id, data, drag, height, width) {
    //     const links = data.links.map(d => Object.create(d));
    //     const nodes = data.nodes.map(d => Object.create(d));
    //     const scale = d3.scaleOrdinal(d3.schemeCategory10);
    //     let expandedNodes = [];

    //     const simulation = d3.forceSimulation(nodes)
    //         .force("link", d3.forceLink(links).id(d => d.id))
    //         .force("charge", d3.forceManyBody())
    //         .force("center", d3.forceCenter(width / 2, height / 2));

    //     const svg = d3.select(id).append("svg")
    //         .attr("viewBox", [0, 0, width, height]);

    //     let zoomableGroup = svg.append("g").attr("class", "everything");
    //     const zoom = d3
    //         .zoom()
    //         .scaleExtent([0.1, 20])
    //         .on("zoom", (e) => {
    //             zoomableGroup.attr("transform", e.transform);
    //         });

    //     // call zoom
    //     svg.call(zoom).on("dblclick.zoom", null);
    //     svg.on("dblclick", function() {
    //         d3.selectAll("circle").style("stroke", "#fff").style("stroke-width", 1.5).style("opacity", 1);
    //         link.attr("display", "none");
    //         setSelectedItem({});
    //         expandedNodes = [];
    //     });

    //     const link = zoomableGroup.append("g")
    //         .attr("stroke", "#999")
    //         .attr("stroke-opacity", 0.6)
    //         .selectAll("line")
    //         .data(links)
    //         .join("line")
    //         .attr("stroke-width", d => Math.sqrt(d.value))
    //         .attr("display", "none");

    //     const node = zoomableGroup.append("g")
    //         .attr("stroke", "#fff")
    //         .attr("stroke-width", 1.5)
    //         .selectAll("circle")
    //         .data(nodes)
    //         .join("circle")
    //         .attr("r", 3)
    //         .attr("fill", d => scale(d.group))
    //         .call(drag(simulation))
    //         .on("click", function(e, d){
    //             if (expandedNodes.includes(d.id)) {
    //                 expandedNodes = expandedNodes.filter(function(value){
    //                     return value !== d.id;
    //                 });
    //                 // transparent nodes
    //                 d3.selectAll("circle").style("opacity", 0.4);
    //                 // recover selected node
    //                 d3.select(this).style("stroke", "#fff").style("stroke-width", 1.5);
    //             } else {
    //                 expandedNodes = [...expandedNodes, d.id];
    //                 // transparent nodes
    //                 d3.selectAll("circle").style("opacity", 0.4);
    //                 // highlight expanded node
    //                 d3.select(this).style("stroke", "orange").style("stroke-width", 2.5).style("opacity", 1);
    //             }
    //             // show connected links
    //             link.attr("display", "none");
    //             expandedNodes.forEach(d => {
    //                 link.each(function(l) {
    //                     if (l.source.id === d || l.target.id === d) {
    //                         d3.select(this).attr("display", "block");
    //                         node.filter(n => n.id === l.source.id || n.id === l.target.id)
    //                         .style("opacity", 1);
    //                     }
    //                 })
    //             });
    //         })
    //         .on("mouseover", function(e, d) {
    //             setSelectedItem(Object.getPrototypeOf(d));
    //         });

    //     node.append("title")
    //         .text(d => d.attr.name);
        
    //     const simulationDurationInMs = 10000; // 10 seconds
    //     let startTime = Date.now();
    //     let endTime = startTime + simulationDurationInMs;
    //     simulation.on("tick", () => {
    //         if (Date.now() < endTime) {
    //             link
    //                 .attr("x1", d => d.source.x)
    //                 .attr("y1", d => d.source.y)
    //                 .attr("x2", d => d.target.x)
    //                 .attr("y2", d => d.target.y);
    //             node
    //                 .attr("cx", d => d.x)
    //                 .attr("cy", d => d.y);
    //         } else {
    //             simulation.stop();
    //         }
    //     });
    // };

    // const drag = simulation => {

    //     function dragstarted(event) {
    //         if (!event.active) simulation.alphaTarget(0.3).restart();
    //         event.subject.fx = event.subject.x;
    //         event.subject.fy = event.subject.y;
    //     }
        
    //     function dragged(event) {
    //         event.subject.fx = event.x;
    //         event.subject.fy = event.y;
    //     }
        
    //     function dragended(event) {
    //         if (!event.active) simulation.alphaTarget(0);
    //         event.subject.fx = null;
    //         event.subject.fy = null;
    //     }
        
    //     return d3.drag()
    //         .on("start", dragstarted)
    //         .on("drag", dragged)
    //         .on("end", dragended);
    // };

    useEffect(() => {
        const contentWidth = document.getElementById('main').clientWidth - 50;
        const contentHeight = document.getElementById('main').clientHeight - 50;
        d3.select('#node-link').select('canvas').remove();
        drawDiagramCanvas('#node-link', data, contentHeight, contentWidth);
    // eslint-disable-next-line
    }, []);

    window.onresize = function () {
        const contentWidth = document.getElementById('main').clientWidth - 50;
        const contentHeight = document.getElementById('main').clientHeight - 50;
        console.log(contentHeight)
        console.log(contentWidth)
        d3.select('#node-link').select('canvas').remove();
        drawDiagramCanvas('#node-link', data, contentHeight, contentWidth);
    }

    return (
        <div>
            <div id='node-link'></div>
        </div>
    )
};

export default NodeLink;