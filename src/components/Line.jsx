import LineState from "../utils/LineState";

function Line(props) {
    const { number, content } = props;

    const charByState = (state) => {
        switch (state) {
            case LineState.ADDED: return "+";
            case LineState.REMOVED: return "-";
            
            default: return "+";
        }
    }

    return (
        <div className="line">
            <span className="line-number" >{content.state !== LineState.EMPTY ? number : ""}</span>
            <span className={`line-char ${content.state}`}>{charByState(content.state)}</span>
            <span className={`line-content ${content.state}`}>{content.text}</span>
        </div>
    );
}

export default Line;