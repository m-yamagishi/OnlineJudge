var aceEditor = ace.edit("source_code");

/*
Set ACE editor options
*/
aceEditor.setOptions({
	enableBasicAutocompletion: true,
	enableLiveAutocompletion: true,
	enableSnippets: true,
});

/*
run the code when "run_button" is clicked, or Ctrl-Enter is pressed.
*/
$("#run_button").on("click", function (event) {
	runCode();
});
aceEditor.commands.addCommand({
	bindKey: {
		win: "Ctrl-Enter",
		mac: "Ctrl-Enter"
	},
	exec: runCode,
});

/*
Language settings
*/
function setEditorLanguage(language) {
	var languageToMode = {
		// ruby: "ruby",
		// python: "python",
		// c: "c_cpp",
		Java: "java"
	};
	var mode = languageToMode[language];
	aceEditor.getSession().setMode("ace/mode/" + mode);
}
$("#language").val("java");
setEditorLanguage("java");
$("#language").on("change", function (event) {
	setEditorLanguage(this.value);
});