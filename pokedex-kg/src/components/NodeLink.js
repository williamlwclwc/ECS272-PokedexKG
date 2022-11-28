import data from "../assets/miserables.json";
import * as d3 from "d3";
import { useContext, useEffect } from 'react';
import { selectedItemContext } from "./MainBoard";

function NodeLink() {
    // eslint-disable-next-line
    const {selectedItem, setSelectedItem} = useContext(selectedItemContext);
    function drawDiagram(id, data, drag, height, width) {
        const links = data.links.map(d => Object.create(d));
        const nodes = data.nodes.map(d => Object.create(d));
        const scale = d3.scaleOrdinal(d3.schemeCategory10);

        const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links).id(d => d.id))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(width / 2, height / 2));

        const svg = d3.select(id).append("svg")
            .attr("viewBox", [0, 0, width, height]);

        let zoomableGroup = svg.append("g").attr("class", "everything");
        const zoom = d3
            .zoom()
            .scaleExtent([0.5, 20])
            .on("zoom", (e) => {
                zoomableGroup.attr("transform", e.transform);
            });

        // call zoom
        svg.call(zoom).on("dblclick.zoom", null);
        svg.on("dblclick", function() {
            d3.selectAll("circle").style("stroke", "#fff").style("stroke-width", 1.5);
            d3.selectAll("line").style("stroke", "#999");
            setSelectedItem({});
        });

        const link = zoomableGroup.append("g")
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.6)
            .selectAll("line")
            .data(links)
            .join("line")
            .attr("stroke-width", d => Math.sqrt(d.value))
            .on("click", function(e, d){
                setSelectedItem(Object.getPrototypeOf(d));
                d3.selectAll("line").style("stroke", "#999");
                d3.selectAll("circle").style("stroke", "#fff").style("stroke-width", 1.5);
                d3.select(this).style("stroke", "orange");
            });

        const node = zoomableGroup.append("g")
            .attr("stroke", "#fff")
            .attr("stroke-width", 1.5)
            .selectAll("circle")
            .data(nodes)
            .join("circle")
            .attr("r", 5)
            .attr("fill", d => scale(d.group))
            .call(drag(simulation))
            .on("click", function(e, d){
                setSelectedItem(Object.getPrototypeOf(d));
                d3.selectAll("line").style("stroke", "#999");
                d3.selectAll("circle").style("stroke", "#fff").style("stroke-width", 1.5);
                d3.select(this).style("stroke", "orange").style("stroke-width", 2.5);
            });

        node.append("title")
            .text(d => d.id);
        
        simulation.on("tick", () => {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);
            node
                .attr("cx", d => d.x)
                .attr("cy", d => d.y);
        });
    };

    const drag = simulation => {

        function dragstarted(event) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
        }
        
        function dragged(event) {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
        }
        
        function dragended(event) {
            if (!event.active) simulation.alphaTarget(0);
            event.subject.fx = null;
            event.subject.fy = null;
        }
        
        return d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);
    };

    useEffect(() => {
        d3.select('#node-link').select('svg').remove();
        drawDiagram('#node-link', data, drag, 450, 600);
    // eslint-disable-next-line
    }, []);

    return (
        <div>
            <div id='node-link'></div>
        </div>
    )
};

export default NodeLink;