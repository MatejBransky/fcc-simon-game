type ActionType =
  | {
      type: 'toggle';
    }
  | { type: 'start' };

export const initialState = {
  on: false,
  started: false,
  display: '',
  steps: [],
};

export default function(state: typeof initialState, action: ActionType) {
  switch (action.type) {
    case 'toggle':
      return { ...state, on: !state.on, display: '--' };
    case 'start':
      return { ...state, display: '--' };
    default:
      return state;
  }
}
