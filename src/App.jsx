class LanguageSelector extends React.Component {
	render() {
		return (
			<h2>Select language</h2>
		);
	}
}

class RepositoryList extends React.Component {
	render() {
		return (
			<h2>View filtered repositories</h2>
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