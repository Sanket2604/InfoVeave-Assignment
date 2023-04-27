import ReactECharts from "echarts-for-react";
import { useEffect, useRef } from "react";
import { options } from "./data";
import "./App.css";

function App() {

	const outerContainer = useRef([]);
	const graphContainer = useRef([]);

	useEffect(() => {
		dragElement(graphContainer.current);
	}, []);

	function dragElement(elmnt) {
		let pos1 = 0,
			pos2 = 0,
			pos3 = 0,
			pos4 = 0;
		elmnt.onmousedown = dragMouseDown;
		let screenHeight = 0,
			screenWidth = 0,
			graphHeight = 0,
			graphWidth = 0;

		function dragMouseDown(e) {
			e = e || window.event;
			e.preventDefault();
			screenHeight =
				outerContainer.current.clientHeight;
			screenWidth =
				outerContainer.current.clientWidth;
			graphHeight = elmnt.clientHeight;
			graphWidth = elmnt.clientWidth;
			elmnt.style.cursor = "grabbing";
			pos3 = e.clientX;
			pos4 = e.clientY;
			elmnt.onmouseup = closeDragElement;
			elmnt.onmousemove = elementDrag;
		}

		function elementDrag(e) {
			e = e || window.event;
			e.preventDefault();
			pos1 = pos3 - e.clientX;
			pos2 = pos4 - e.clientY;
			pos3 = e.clientX;
			pos4 = e.clientY;
			if (
				(elmnt.offsetLeft > 0 || pos1 < 0) &&
				(elmnt.offsetLeft + graphWidth < screenWidth || pos1 > 0)
			) {
				elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
			}
			if (
				(elmnt.offsetTop > 0 || pos2 < 0) &&
				(elmnt.offsetTop + graphHeight < screenHeight || pos2 > 0)
			) {
				elmnt.style.top = elmnt.offsetTop - pos2 + "px";
			}
		}

		function closeDragElement() {
			elmnt.style.cursor = "grab";
			elmnt.onmouseup = null;
			elmnt.onmousemove = null;
		}
	}

	return (
		<div className="outer-container" ref={outerContainer}>
			<div className="graph-container" ref={graphContainer}>
				<ReactECharts option={options} />
			</div>
		</div>
	);
}

export default App;
