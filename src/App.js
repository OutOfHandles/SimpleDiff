import "./App.css";
import "./utils/DiffChecker.js";
import DiffChecker from "./utils/DiffChecker.js";
import TextEditor from "./components/TextEditor.jsx"
import TextDiff from "./components/TextDiff.jsx"
import { useState } from "react";


function App() {
	const dc = new DiffChecker();
	const [originalText, setOriginalText] = useState("");
	const [modifiedText, setModifiedText] = useState("");
	const [originalDiff, setOriginalDiff] = useState([]);
	const [modifiedDiff, setModifiedDiff] = useState([]);

	const getDiff = () => {
		dc.generateLcs(originalText.split("\n"), modifiedText.split("\n"));

		setOriginalDiff(dc.getOriginalDiff());
		setModifiedDiff(dc.getModifiedDiff());
	}

	return (
		<div className="App-header">
			<div className="container">
				<TextEditor setContent = {setOriginalText} />
				<TextEditor setContent = {setModifiedText} />
				<div className="btn-container">
					<div 
						onClick={() => {
							getDiff()
						}}
					>
						Get diff
					</div>
				</div>
				<div className="editor3 editor-textarea">
					<TextDiff diff = {originalDiff} />
					</div>
				<div className="editor4 editor-textarea">
					<TextDiff diff = {modifiedDiff} />
				</div>
			</div>
		</div>
	);
}

export default App;
