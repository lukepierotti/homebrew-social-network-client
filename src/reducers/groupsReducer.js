export default function GroupsReducer(state = {currentGroup: {}, allGroups: []}, action) {
	switch(action.type) {
		case 'CREATE_GROUP':
			return Object.assign({}, state, {currentGroup: action.payload.group, allGroups: [...state.allGroups, action.payload.group]})
		case 'GET_GROUP_INFO':
			return Object.assign({}, state, {currentGroup: action.payload.group})
		default:
			return state
	}
}