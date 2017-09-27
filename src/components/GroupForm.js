import React from 'react'
import { connect } from 'react-redux'
import { getAllUsers } from '../actions/users'
import Select from 'react-select';
import FollowDisplay from './FollowDisplay'
import { createGroup } from '../actions/groups'
import Dropzone from 'react-dropzone'
import axios from 'axios'



class GroupForm extends React.Component {

	constructor() {
		super()
		this.state = {
			name: '',
			description: '',
			members: [], 
			image: ''
		}
	}

	componentDidMount() {
		this.props.getAllUsers()
	}

	handleDrop = (files) => {
		const formData = new FormData();
		formData.append('file', files[0])
		formData.append('upload_preset', 'f9x8cstk')
		axios.post('https://api.cloudinary.com/v1_1/dflt9qlwf/image/upload', formData, {
			headers: { "X-Requested-With": "XMLHttpRequest" }
		})
			.then(res => {
				const data = res.data
				const fileURL = data.secure_url
				this.setState({image: fileURL})
			})
	}

	handleChange = (event) => {
		this.setState({[event.target.name]: event.target.value})
	}

	handleSelect = (selected) => {
		this.setState({members: [...this.state.members, selected.value]})
	}

	handleSubmit = (event) => {
		event.preventDefault()
		this.props.createGroup(this.state)
	}

	render() {
		console.log(this.props, this.state.members)
		if (this.props.allUsers) {
			const options = this.props.allUsers.map(user => {
				if (this.state.members.find(member => member === user.username)) {
					console.log('in here')
					return {value: '', label: ''}
				} else{
					return {value: user.username, label: user.username}
				}
			})
			return (
				<div>
					<form onSubmit={this.handleSubmit}>
					{this.state.image ? <img src={this.state.image} alt=''/> : <Dropzone onDrop={this.handleDrop} accept="image/*" ><p>Add a group picture here!</p></Dropzone>}
						<label>Name</label>
						<input onChange={this.handleChange} name='name' type='text' />
						<label>Description</label>
						<input onChange={this.handleChange} name='description' type='textarea' />
						<Select 
							options={options}
							onChange={this.handleSelect}
						/>
						<input type='submit' />
					</form>
					{this.state.members ? this.state.members.map((name, index) => {
						const foundUser = this.props.allUsers.find(user => user.username === name)
						console.log(foundUser)
						return <FollowDisplay key={index} data={foundUser} />
						}) : null}
				</div>
			)
		} else {
			return <div></div>
		}
		
	}
}

function mapStateToProps(state) {
	return {
		allUsers: state.users.all
	}
}
function mapDispatchToProps(dispatch) {
	return {
		getAllUsers: () => {dispatch(getAllUsers())},
		createGroup: (params) => {dispatch(createGroup(params))}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupForm)