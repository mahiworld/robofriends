import React from 'react';
// import {robots} from '../components/robots';
import Cardlist from '../components/Cardlist';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';

class App extends React.Component{
	constructor(){
		super()
		this.state = {
			'robots' : [],
			'searchfield' : '',
		}
	}

	componentDidMount(){
		fetch("https://jsonplaceholder.typicode.com/users")
			.then(response=>{
				return response.json()
			})
			.then(users=>{
				this.setState({'robots': users})
			})
	}

	onsearchChange = (event)=>{
		this.setState({'searchfield': event.target.value})
	}

	render(){
		const filterRobots = this.state.robots.filter((robots)=>{
			return robots.name.toLowerCase().includes(this.state.searchfield.toLowerCase())
		})
		if(this.state.robots.length === 0)
			return <h1>Loading....</h1>
		else{
			return(
			<div className = "tc">
				<h1>Robofriends</h1>
				<SearchBox searchChange = {this.onsearchChange}/>
				<Scroll>
					<Cardlist robots = {filterRobots}/>
				</Scroll>
			</div>
			);
		}
	}	
}

export default App;