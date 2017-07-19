import React from 'react'
import axios from 'axios'

export default class About extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			text: "Loading..."
		}
	}

	componentDidMount() {
		axios.get('/api/helloworld')
		.then(({data}) => this.setState({
			text: data.text
		}))
	}

	render() {
		return (
			<div className="content">
				<h5>Built by <a href="http://www.nathandalal.com">Nathan Dalal</a>.</h5>
				<h6>Please make an issue on Github with any complaints or suggestions.</h6>
				<p>
					This text comes from <a href="/api">an API located here</a>. <pre>{this.state.text}</pre>	
				</p>
			</div>
		)
	}
}