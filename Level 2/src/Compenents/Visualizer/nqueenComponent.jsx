import { useEffect, useState } from "react"
import { Nqueen } from "../Algorithm/nqueen";
import { changeDelay } from "../Utils/utils";
import './nqueenComponent.css';

export default function NQueen() {

	var [gridSize, setGridSize] = useState(4);
	var [grid, setGrid] = useState([]);

	function renderGrid(val) {
		var arr = []
		for (var i = 0; i < val; i++) {
			var tr = []
			for (var j = 0; j < val; j++) {
				if ((i % 2) === (j % 2)) {
					tr.push('white element-block')
				} else {
					tr.push('black element-block')
				}
			}
			arr.push(tr)
		}
		setGrid(arr);
		setTimeout(() => {
			const ele = document.querySelectorAll('.element-block');
			for (let i = 0; i < ele.length; i++) {
				ele[i].innerHTML = '';
			}
		}, 0); 
	}
	useEffect(() => {
		renderGrid(4);
	}, [])

	function setGridd(e) {
		setGridSize(e.target.value)
		renderGrid(e.target.value)
	}

	return (
		<div>
			
			<div style={{ marginTop: '100px' }}>
				<div>
					<label>
						Grid Size: {gridSize} X {gridSize}
						<input id='rangeSlider' type='range' min='4' max='16' value={gridSize} onChange={(e) => (setGridd(e))} />
					</label>
					<br />
					<label>
						Delay:
					<input type='range' min='1' max='100' onChange={(e) => { changeDelay(e.target.value) }} />
					</label>
					<div><button className='btn' id='nqueen' onClick={Nqueen}>N-QUEEN</button></div>

				</div>
				<br />
				<div className='box'>
					<table className='board'>
						<tbody>
							{
								grid === null ? null :
									grid.map((row, ridx) => (
										<tr key={ridx}>
											{
												row.map((c, cid) => (
													<td
														key={cid}
														style={{
															width: 400 / gridSize,
															height: 400 / gridSize,
															fontSize: 200 / gridSize,
														}}
														className={c} >
													</td>
												))
											}
										</tr>
									))
							}
						</tbody>
					</table>
				</div>
			</div>
		</div >
	)
}