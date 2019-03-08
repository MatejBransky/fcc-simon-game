import React, { useRef, useReducer } from 'react';

import reducer, { initialState } from '../reducer';
import './App.scss';

const App = () => {
  const btnGreen = useRef(null);
  const btnRed = useRef(null);
  const btnYellow = useRef(null);
  const btnBlue = useRef(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const count = state.steps.length;

  return (
    <div className="App">
      <div className="App__base Game">
        <div className="Game__buttons">
          <button
            className="Game__button Game__button--top-left"
            data-testid="button-green"
            ref={btnGreen}
          />
          <button
            className="Game__button Game__button--top-right"
            data-testid="button-red"
            ref={btnRed}
          />
          <button
            className="Game__button Game__button--bottom-right"
            data-testid="button-yellow"
            ref={btnYellow}
          />
          <button
            className="Game__button Game__button--bottom-left"
            data-testid="button-blue"
            ref={btnBlue}
          />
        </div>
        <div className="Game__dashboard Dashboard">
          <title className="Dashboard__title">Simon</title>

          <div className="Dashboard__controls Controls">
            <div className="Controls__block Block">
              <div className="Block__display">{count}</div>
              <p className="Block__description">Count</p>
            </div>

            <div className="Controls__block Block">
              <button className="Block__button" />
              <p className="Block__description">Start</p>
            </div>

            <div className="Controls__block Block">
              <div className="Block__control" />
              <button className="Block__button" />
              <p className="Block__description">Strict</p>
            </div>
          </div>

          <div className="Dashboard__switch Switch">
            <p className="Switch__text Switch__text--left">Off</p>
            <div className="Switch__socket">
              <button
                className={
                  'Switch__button ' + state.on
                    ? 'Switch__button--on'
                    : 'Switch__button--off'
                }
              />
            </div>
            <p className="Switch__text Switch__text--right">On</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
