/* eslint-disable */

/**
 * The copy of the stateMachine.js for Visualizer (modified imports)
 */

// Available variables:
// Machine (machine factory function)
// XState (all XState exports)

const settings = {
  steps: 20,
  colors: ['RED', 'GREEN', 'YELLOW', 'BLUE'],
};

const initialContext = {
  strict: false,
  steps: [],
  playerSteps: [],
  visibleStep: null,
};

const gameMachine = Machine(
  {
    id: 'simon',
    context: initialContext,
    initial: 'notRunning',
    states: {
      notRunning: {
        on: { TOGGLE: 'running' },
      },
      running: {
        on: {
          TOGGLE: {
            actions: 'resetContext',
            target: 'notRunning',
          },
        },
        initial: 'idle',
        states: {
          idle: {
            on: {
              TOGGLE_STRICT: {
                actions: 'toggleStrict',
              },
              START: 'intro',
            },
          },
          intro: {
            after: {
              3000: {
                actions: 'doMove',
                target: 'showSteps',
              },
            },
          },
          warningWrongMove: {
            after: {
              3000: 'showSteps',
            },
          },
          showSteps: {
            on: {
              '': {
                actions: 'setVisibleStep',
                target: 'showStep',
              },
            },
          },
          showStep: {
            after: {
              1000: [
                {
                  cond: 'isTheVisibleStepTheLast',
                  actions: 'clearVisibleStep',
                  target: 'playing',
                },
                {
                  target: 'showSteps',
                },
              ],
            },
          },
          playing: {
            on: {
              MOVE: {
                actions: 'recordMove',
                target: 'checkStep',
              },
              ...settings.colors.reduce((acc, color) => {
                return {
                  ...acc,
                  [`CLICK_${color}`]: {
                    actions: `click${color.charAt(0) +
                      color.slice(1).toLowerCase()}`,
                    target: 'checkStep',
                  },
                };
              }, {}),
            },
          },
          checkStep: {
            on: {
              '': [
                {
                  cond: 'isThePlayedStepCorrect',
                  target: 'checkPlayedStep',
                },
                {
                  cond: 'isStrict',
                  actions: ['resetPlayerSteps', 'resetSteps', 'doMove'],
                  target: 'lose',
                },
                {
                  actions: 'resetPlayerSteps',
                  target: 'warningWrongMove',
                },
              ],
            },
          },
          checkPlayedStep: {
            on: {
              '': [
                {
                  cond: 'isThePlayedStepTheLast',
                  target: 'checkGame',
                  actions: 'resetPlayerSteps',
                },
                {
                  target: 'playing',
                },
              ],
            },
          },
          checkGame: {
            on: {
              '': [
                {
                  cond: 'isTheLastMove',
                  target: 'win',
                },
                {
                  actions: 'doMove',
                  target: 'showSteps',
                },
              ],
            },
          },
          win: {
            type: 'final',
          },
          lose: {
            type: 'final',
            on: {
              START: {
                actions: 'restart',
                target: 'intro',
              },
            },
          },
        },
      },
    },
  },
  {
    actions: {
      resetContext: XState.actions.assign(initialContext),
      restart: XState.actions.assign(ctx => ({
        ...initialContext,
        strict: ctx.strict,
      })),
      toggleStrict: XState.actions.assign({
        strict: ctx => !ctx.strict,
      }),
      doMove: XState.actions.assign({
        steps: ctx => [...ctx.steps, getColor(settings.colors)],
      }),
      setVisibleStep: XState.actions.assign({
        visibleStep: ctx =>
          ctx.visibleStep === null ? 0 : ctx.visibleStep + 1,
      }),
      clearVisibleStep: XState.actions.assign({
        visibleStep: null,
      }),
      recordMove: XState.actions.assign({
        playerSteps: (ctx, event) => [...ctx.playerSteps, event.button],
      }),
      resetPlayerSteps: XState.actions.assign({
        playerSteps: [],
      }),
      resetSteps: XState.actions.assign({
        steps: [],
      }),
      // temporary (for demonstration only)
      ...settings.colors.reduce((acc, color) => {
        return {
          ...acc,
          [`click${color.charAt(0) + color.slice(1).toLowerCase()}`]: _assign(
            color
          ),
        };
      }, {}),
    },

    guards: {
      isStrict: ctx => ctx.strict,
      isTheVisibleStepTheLast: ctx => {
        if (ctx.visibleStep === ctx.steps.length - 1) {
          return true;
        }
        return false;
      },
      isThePlayedStepCorrect: ctx => {
        const playedIndex = ctx.playerSteps.length - 1;
        const playedStep = ctx.playerSteps[playedIndex];
        if (playedStep === ctx.steps[playedIndex]) {
          return true;
        }
        return false;
      },
      isThePlayedStepTheLast: ctx =>
        ctx.playerSteps.length === ctx.steps.length,
      isTheLastMove: ctx => ctx.steps.length === settings.steps,
    },
  }
);

function getColor(colors) {
  const index = _randomize(0, colors.length - 1);
  return colors[index];
}

function _randomize(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function _assign(color) {
  return XState.actions.assign({
    playerSteps: ctx => [...ctx.playerSteps, color],
  });
}
