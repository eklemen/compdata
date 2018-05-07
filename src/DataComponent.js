import { connect as reduxConnect } from 'react-redux';

/*
   connect - Connects a component to the redux state and injects comp data and
   setData into props.
   @param stateProps (store) => Object - A function that accepts a store and
   returns the props to map to props.
   @param actions Object - An object containing actions to map to props.

   @returns (Component, String) => Component - Returns a function that can be
   passed a component and key string used to identify which subtree in
   CompData is used by default in the setData action.

   Example:

    class MyComponent extends React.Component {
        componentWillMount() {
            // we have this.props.compData already
        }

        updateMyData(data) {
            this.props.setData({ myData: data });
        }
    }

    // We dont need to bring in compdata, its done for us
    mapState = (store) = ({
        anotherState: store.anotherState
    });

    mapActions = {
        myAction,
        myOtherAction
    };

    export default connect(mapState, mapActions)(MyComponent, 'MyStateKey');
*/

export const connect = (stateProps, actions = {}) => (klass, stateName) => {
    // We expect stateProps to be a function of the form (dispatch) => Object.
    // A new function is returned that accepts the store, evaluates the passed
    // function and appends out comp data object to.
    const mapStateToProps = (store) => {
        let result = {};
        if (stateProps) {
            result = stateProps(store);
        }
        if (stateName) {
            result.compData = store.CompData[stateName] || {};
        }
        return result;
    };

    // The setData function sets data for the compData section of the state.
    // It can be called with a name and data parameter or a single data
    // parameter; which uses the predefined stateName.
    const setData = (name, data) => (dispatch) => {
        let payloadName = name;
        let payloadData = data;
        if (data === undefined) {
            if (!stateName) {
                throw new Error('Default CompData name not set');
            }
            payloadData = name;
            payloadName = stateName;
        }
        return dispatch({
            type: 'SET_COMP_DATA',
            payload: {
                data: payloadData,
                name: payloadName
            }
        });
    };

    let actionMapper = {};
    // Check to see if the passed set of actions is a function. In this case we
    // are expecting a function in the form of (dispatch) => Object.
    // We will return a new function that unwraps the passed dispatch function
    // and adds in the setData method.
    // If its just a standard object: We will inject setData to it. If its a
    // function we will wrap it in another function that evalulates the passed
    // function and appends a new lifted function for our setData method.
    if (typeof actions === 'function') {
        actionMapper = (dispatch) => ({
            ...actions(dispatch),
            setData: (name, data) => (dispatch) => setData(dispatch)(name, data)
        });
    } else {
        actionMapper = {
            ...actions,
            setData
        };
    }

    return reduxConnect(mapStateToProps, actionMapper)(klass);
};
