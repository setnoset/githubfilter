const accessToken = "d4ad8a2fed301ce8b91a67a0165e07b75e2e5d79";

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
		this.setRepositories(this.props.language);
	}

	componentDidUpdate(prevProps) {
		if (prevProps.language != this.props.language)
			this.setRepositories(this.props.language);
	}

	async setRepositories(lang) {
		if (lang == '') {
			this.setState({reps: []});
			return;
		}

		const query = `query langQuery($q: String!) {
		  search(type: REPOSITORY, query: $q, first: 100) {
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

		const response = await fetch('https://api.github.com/graphql', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` },
			body: JSON.stringify({ query, variables: {"q": "language:" + lang} })
		});
		const json = await response.json();
		console.log(json);
		const nodes = json.data.search.edges.map(node => node.node);
		const reps = nodes.map(function(node) {
			return {name: node.nameWithOwner, url: node.url, starCount: node.stargazers.totalCount}
		});
		this.setState({reps: reps});
	}

	render() {
		const repositoryItems = this.state.reps.map(rep => <RepositoryItem key={rep.name} rep={rep}/>);
		return (
			<table className="bordered-table">
				<thead>
					<tr>
						<th>Star Count</th>
						<th width='500px'>Repository</th>
					</tr>
				</thead>
				<tbody>
					{repositoryItems}
				</tbody>
			</table>
		);
	}
}

function RepositoryItem(props) {
	const rep = props.rep;
	return (
		<tr>
			<td>{rep.starCount}</td>
			<td><a href={rep.url}>{rep.name}</a></td>
		</tr>
	);
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