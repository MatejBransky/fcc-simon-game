type ActionType = {
  type: 'foo' | 'bar';
};

export const initialState = {
  on: false,
  steps: [],
};

export default function(state: typeof initialState, action: ActionType) {
  switch (action.type) {
    case 'foo':
      return state;
    default:
      return state;
  }
}
