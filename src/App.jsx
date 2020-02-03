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
	render() {
		return (
			<React.Fragment>
				<h1>Repository Filter</h1>
				<LanguageSelector/>
				<RepositoryList/>
			</React.Fragment>
		);
	}
}

const element = <RepositoryFilter/>

ReactDOM.render(element, document.getElementById('content'));