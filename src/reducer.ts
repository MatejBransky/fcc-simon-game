type ActionType =
  | { type: 'toggle' }
  | { type: 'start' }
  | { type: 'blink' }
  | { type: 'stop-blink' };

type StateType = {
  on: boolean;
  started: boolean;
  interval: number;
  display: string;
  steps: string[];
};

export const initialState = {
  on: false,
  started: false,
  interval: 0,
  display: '',
  steps: [],
};

export default function(state: StateType, action: ActionType) {
  switch (action.type) {
    case 'toggle':
      return { ...state, on: !state.on, display: '--' };
    case 'start':
      return { ...state, interval: 300 };
    case 'blink':
      return { ...state, display: state.display === '--' ? '' : '--' };
    case 'stop-blink':
      return { ...state, interval: 0, display: '01' };
    default:
      return state;
  }
}
