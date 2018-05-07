import React from 'react';
import { connect } from '../src/DataComponent';

const TestComponent = ({ setData, compData }) => {
    return (
        <div>
            TestComponent
            <button className="toggle-btn" onClick={
                () => { setData({ toggle: true }) }
            }>Toggle</button>
            { compData.showText && <p className="isToggled">Hi</p> }
            <button className="login-btn" onClick={
                () => { setData('LoginContainer', { userId: '1234' }) }
            }>Login</button>
        </div>
    );
};

// export default TestComponent;
export default connect(({}) => ({}))(TestComponent, 'TestComponent');
