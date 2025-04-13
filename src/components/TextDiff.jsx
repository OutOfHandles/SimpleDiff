import Line from "./Line.jsx";
import LineState from "../utils/LineState.js";

function TextDiff(props) {
    const { diff } = props;

    let n = 0;

    return (
        <div>
            {
                diff.map((e, i) => {
                    if (e.state !== LineState.EMPTY) {
                        n++;
                    }
                    
                    return (
                        <Line key = {i} number = {n} content = {e} />
                    );
                })
            }
        </div>
	);
}

export default TextDiff;