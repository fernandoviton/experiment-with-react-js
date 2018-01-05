// This module is a helper that generates a middleware from a side effect.
// A side effect is really a subset of middleware.  It only gets access to state (pre and post reduction) and dispatch.
// As a result of this it can't interrupt or change the reduction - it can only generated side effects

export default sideEffect => store => next => action => {
    const oldState = store.getState();
    const nextAction = next(action);
    const newState = store.getState();
    sideEffect(oldState, newState, store.dispatch, action);
    return nextAction;
};