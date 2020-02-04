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
	constructor() {
		super();
		this.state = {
			reps: [],
		};
	}

	componentDidMount() {
		setRepositories(this.props.language);
	}

	async setRepositories(lang) {
		const query = `query langQuery {
		  search(type: REPOSITORY, query: "language:objective-c", first: 30) {
		    edges {
		      node {
		        ... on Repository {
		          stargazers {
		            totalCount
		          }
		          url
		          nameWithOwner
		        }
		      }
		    }
		  }
		}`;

		const response = await fetch('/graphql', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json'},
			body: JSON.stringify({ query: query, variables: {lang} })
		});
		const nodes = response.json().data.search.edges.map(node => node.node);
		const reps = nodes.map(node => {
			nameWithOwner: node.nameWithOwner;
			url: node.url;
			starCount: node.stargazers.totalCount
		});
		this.setState({reps: reps});
	}

	render() {
		const repositoryItems = props.reps.map(rep => <RepositoryItem rep={rep}/>);
		return (
			<table>
				<thead>
					<tr>
						<th>Repository</th>
						<th>Star Count</th>
					</tr>
				</thead>
				<tbody>
					{repositoryItems}
				</tbody>
			</table>
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