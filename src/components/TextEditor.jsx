function TextEditor(props) {
    const { setContent } = props;

    return (
		<div className="editor-container">
			<textarea 
                className="editor-textarea"
                onChange={(e) => {
                    setContent(e.target.value);
                }}
            />
		</div>
	);
}

export default TextEditor;