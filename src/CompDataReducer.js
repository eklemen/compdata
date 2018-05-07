import update from 'immutability-helper';

export default function CompData(
    state = {},
    action = { type: null, payload: null }
) {
    const { payload, type } = action;
    switch (type) {
        case 'SET_COMP_DATA': {
            if (!state[payload.name]) {
                return update(state, {
                    [payload.name]: { $set: payload.data }
                });
            }
            return update(state, {
                [payload.name]: { $merge: payload.data }
            });
        }
        default:
            return state;
    }
}
