# Redux CompData

## What is this?
`CompData` is a higher order component that exposes props to quickly set data into your redux store. This works much in the same way `this.setState()` works, only the data ends up in redux.

## Why?
This package removes the need to create any additional actions, reducers, extra files, or tests. This makes adding data to the store as easy as passing our component to `connect` and calling a function from `props`. The goal is to help organize redux data by name-spacing it based on the name of the components.

## Getting Started

#### Install via npm
```text
npm install -S compdata
# Or
yarn add compdata
```

#### Add CompData to your rootReducer
```jsx harmony
// rootReducer.js
import { CompDataReducer } from 'compdata';

const rootReducer = combineReducers({
    CompData: CompDataReducer
})
```
#### Wrap your component with the `connect` HOC
```javascript
import { connect } from 'compdata';

export default connect()(LoginContainer, 'LoginContainer')
// Creates redux object at: state.CompData.LoginContainer

// Additional props and actions are params of connect as usual
// Apart from the regular redux syntax, just pass in the string of the component name
// The string will be used to name the object in state.CompData
export default connect(
    mapStateToProps, mapDispatchToProps
)(LoginContainer, 'LoginContainer');

```

#### Full component example
```jsx harmony
import React, { Component } from 'react';
import { connect } from 'compdata';

class LoginContainer extends Component {
    componentDidMount() {
        const { setData } = this.props;
        setData({ isAuthenticated: false });
    }

    toggleAuth() {
        const { setData, compData } = this.props;
        setData({
            isAuthenticated: !compData.isAuthenticated
        })
    }

    render() {
        const { compData } = this.props;
        return (
            <div>
                <p>{ compData.isAuthenticated ? 'Welcome back!' : 'Please Login'}</p>
                <button onClick={ this.toggleAuth }>Toggle Login</button>
            </div>
        );
    }
}

// Note: Calling setData will implicitly use the name passed in
// (ie 'LoginContainer') unless specified otherwise
export default connect(
    mapStateToProps, actions
)(LoginContainer, 'LoginContainer');

```

#### Call `setData` for a different component
```jsx harmony
// you can setData with a different key name, just pass a string as the first param
setData('SomeOtherComponent', {data})

// this creates: state.CompData.SomeOtherComponent.data

```

#### Redux store structure example
```jsx harmony
store: {
    CompData: {
        LoginContainer: {
            isAuthenticated: true,
            userInfo: {
                name: 'Tim',
                email: 'tim@domain.com'
            }
        },
        Todos: {
            selectedTodo: {
                title: 'take dog for a walk',
                complete: true
            }
        }
    }
}
```

