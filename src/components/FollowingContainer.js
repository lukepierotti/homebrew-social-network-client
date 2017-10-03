import React from 'react'
import { connect } from 'react-redux'
import { getFollows } from '../actions/users'
import FollowDisplay from './FollowDisplay'
import { Segment, Divider } from 'semantic-ui-react'

class FollowingContainer extends React.Component {

	componentDidMount() {
		this.props.getFollows(this.props.id)
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.id !== nextProps.id){
			this.props.getFollows(nextProps.id)
		}
	}

	render() {
		console.log(this.props)
		return (
			<div className={'followingContainer'}>
				<Segment>
					
					<h2>{this.props.currentUser === this.props.viewing ? 'Your' : `People ${this.props.viewing}` } Follows</h2>
					
					{this.props.follows ? this.props.follows.map((follow, index) => <FollowDisplay key={index} data={follow}/>) : null}
					<Divider />
					<h2>Followers</h2>
					<Divider />
					{this.props.followers ? this.props.followers.map((follower, index) => <FollowDisplay key={index} data={follower}/>) : null}
				</Segment>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {	
		follows: state.users.userFollowees,
		followers: state.users.userFollowers
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getFollows: (id) => dispatch(getFollows(id))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FollowingContainer)