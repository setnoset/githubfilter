class LanguageSelector extends React.Component {
	constructor() {
		super();
		this.handleSelect = this.handleSelect.bind(this);
	}

	handleSelect(e) {
		const selector = document.getElementById("language-select");
		console.log(selector.value)
		this.props.setLanguage(selector.value);
	}

	render() {
		return (
			<select name="languages" id="language-select" onChange={this.handleSelect}>
				<option value="">--Select a language--</option>
				<option value="javascript">JavaScript</option>
				<option value="python">Python</option>
				<option value="java">Java</option>
				<option value="go">Go</option>
				<option value="c++">C++</option>
				<option value="php">PHP</option>
				<option value="c">C</option>
				<option value="objective-c">Objective-C</option>
				<option value="ruby">Ruby</option>
				<option value="swift">Swift</option>
			</select>
		);
	}
}

class RepositoryList extends React.Component {
	render() {
		return (
			<h2>View filtered repositories for language {this.props.language}</h2>
		);
	}
}

class RepositoryFilter extends React.Component {
	constructor() {
		super();
		this.state = {language: ''};
		this.setLanguage = this.setLanguage.bind(this);
	}

	setLanguage(lang) {
		this.setState({language: lang});
	}

	render() {
		return (
			<React.Fragment>
				<h1>Repository Filter</h1>
				<LanguageSelector setLanguage={this.setLanguage}/>
				<RepositoryList language={this.state.language}/>
			</React.Fragment>
		);
	}
}

const element = <RepositoryFilter/>

ReactDOM.render(element, document.getElementById('content'));