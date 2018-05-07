import CompDataReducer from '../src/CompDataReducer';

describe('CompDataReducer', () => {
    let state = {};
    let action = {};
    let reducer;
    it('should handle default state', function () {
        reducer = CompDataReducer();
        expect(reducer).toEqual({});
    });
    it('should add new comp data key to empty state', () => {
        action = {
            type: 'SET_COMP_DATA',
            payload: {
                name: 'MedicationsContainer',
                data: { selectedRx: 'Ibuprofen' }
            }
        };

        reducer = CompDataReducer(state, action);
        expect(reducer).toEqual({
            MedicationsContainer: {
                selectedRx: 'Ibuprofen'
            }
        });
    });
    it('should add new comp data key to populated state', () => {
        state = {
            MedicationsContainer: {
                selectedRx: 'Ibuprofen'
            }
        };
        action = {
            type: 'SET_COMP_DATA',
            payload: {
                name: 'LoginContainer',
                data: { userId: 1234 }
            }
        };

        reducer = CompDataReducer(state, action);
        expect(reducer).toEqual({
            MedicationsContainer: {
                selectedRx: 'Ibuprofen'
            },
            LoginContainer: {
                userId: 1234
            }
        });
    });
    it('should update comp data key with new data', () => {
        state = {
            MedicationsContainer: {
                selectedRx: 'Ibuprofen'
            }
        };
        action = {
            type: 'SET_COMP_DATA',
            payload: {
                name: 'MedicationsContainer',
                data: { selectedRx: 'Aspirin' }
            }
        };

        reducer = CompDataReducer(state, action);
        expect(reducer).toEqual({
            MedicationsContainer: {
                selectedRx: 'Aspirin'
            }
        });
    });
    it('should update comp data key with new object of data', () => {
        state = {
            MedicationsContainer: {
                selectedRx: 'Ibuprofen'
            }
        };
        action = {
            type: 'SET_COMP_DATA',
            payload: {
                name: 'MedicationsContainer',
                data: {
                    selectedRx: {
                        name: 'Aspirin',
                        dose: '20mg',
                        prescriberList: ['Dr. Nicholas Riviera']
                    }
                }
            }
        };

        reducer = CompDataReducer(state, action);
        expect(reducer).toEqual({
            MedicationsContainer: {
                selectedRx: {
                    name: 'Aspirin',
                    dose: '20mg',
                    prescriberList: ['Dr. Nicholas Riviera']
                }
            }
        });
    });
});