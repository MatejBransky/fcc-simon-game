import React, { useRef, useReducer } from 'react';

import reducer, { initialState } from './reducer';

const App = () => {
  const btnGreen = useRef(null);
  const btnRed = useRef(null);
  const btnYellow = useRef(null);
  const btnBlue = useRef(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const count = state.steps.length;

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
              <div className="Block__display">{count}</div>
              <p className="Block__description">Count</p>
            </div>

            <div className="Controls__block Block">
              <button className="Block__button Block__button--red" />
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
          >
            <p className="Switch__text Switch__text--left">Off</p>
            <button className="Switch__socket">
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