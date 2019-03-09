import React, { useEffect, useRef, useReducer } from 'react';

import reducer, { initialState } from './reducer';
import useInterval from './useInterval';

const App = () => {
  const btnGreen = useRef(null);
  const btnRed = useRef(null);
  const btnYellow = useRef(null);
  const btnBlue = useRef(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  useInterval(() => dispatch({ type: 'blink' }), state.interval);

  useEffect(() => {
    if (state.interval > 0) {
      setTimeout(() => {
        dispatch({ type: 'stop-blink' });
      }, 3000);
    }
  }, [state.interval]);

  return (
    <div className="Wrapper">
      <div className="Game">
        <div className="Game__buttons">
          <button
            className="Game__button Game__button--top-left Game__button--green"
            data-testid="button-green"
            ref={btnGreen}
          />
          <button
            className="Game__button Game__button--top-right Game__button--red"
            data-testid="button-red"
            ref={btnRed}
          />
          <button
            className="Game__button Game__button--bottom-left Game__button--yellow"
            data-testid="button-yellow"
            ref={btnYellow}
          />
          <button
            className="Game__button Game__button--bottom-right Game__button--blue"
            data-testid="button-blue"
            ref={btnBlue}
          />
        </div>
        <div className="Game__dashboard Dashboard">
          <header className="Dashboard__title">Simon</header>

          <div className="Dashboard__controls Controls">
            <div className="Controls__block Block">
              <div className="Block__display" data-testid="display">
                {state.on && state.display}
              </div>
              <p className="Block__description">Count</p>
            </div>

            <div className="Controls__block Block">
              <button
                className="Block__button Block__button--red"
                onClick={() => dispatch({ type: 'start' })}
              />
              <p className="Block__description">Start</p>
            </div>

            <div className="Controls__block Block">
              <div className="Block__control" />
              <button className="Block__button Block__button--yellow" />
              <p className="Block__description">Strict</p>
            </div>
          </div>

          <div
            className={
              'Dashboard__switch Switch ' +
              (state.on ? 'Switch--on' : 'Switch--off')
            }
            data-testid="switch"
          >
            <p className="Switch__text Switch__text--left">Off</p>
            <button
              className="Switch__socket"
              onClick={() => dispatch({ type: 'toggle' })}
            >
              <div className={'Switch__handle '} />
            </button>
            <p className="Switch__text Switch__text--right">On</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
