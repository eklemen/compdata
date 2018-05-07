import React from 'react';
import { Provider } from 'react-redux';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store'
import TestComponent from './TestComponent';

describe('connect HOC', () => {
    let wrapper, props, store;

    Enzyme.configure({ adapter: new Adapter() });
    beforeEach(() => {
        const mockStore = configureStore([thunk]);
        store = mockStore({ CompData: {}});
        props = {};
        wrapper = mount(
            <Provider store={ store }>
                <TestComponent />
            </Provider>
        );
    });
    afterEach(() => { store.clearActions() });

    it('should render the connected component', () => {
        expect(wrapper.length).toEqual(1);
        expect(wrapper.find('TestComponent').exists()).toBe(true)
    });
    it('connected component should inherit props: `compData` and `setData`', () => {
        expect(wrapper.find('TestComponent').exists()).toBe(true);
        const connectedProps = wrapper.find('TestComponent').props();
        expect(connectedProps.compData).toEqual({});
        expect(connectedProps.setData).toBeInstanceOf(Function);
    });
    it('calling setData prop will dispatch a redux action', () => {
        const btn = wrapper.find('button.toggle-btn');
        btn.simulate('click');
        expect(store.getActions()).toEqual([{
            payload: {
                data: { toggle: true},
                name: 'TestComponent'
            },
            type: 'SET_COMP_DATA'
        }]);
    });
    it('calling setData prop with `name` param will dispatch for another compData', () => {
        const btn = wrapper.find('button.login-btn');
        btn.simulate('click');
        expect(store.getActions()).toEqual([{
            payload: {
                data: { userId: '1234'},
                name: 'LoginContainer'
            },
            type: 'SET_COMP_DATA'
        }]);
    });
});