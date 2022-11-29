export const processPending = (state) => {
  state.loadingState = 'loading';
  state.error = null;
};
export const processRejected = (state, { payload: error }) => {
  state.loadingState = 'idle';
  state.error = error;
};
export const processFulfilled = (state) => {
  state.loadingState = 'idle';
  state.error = null;
};
