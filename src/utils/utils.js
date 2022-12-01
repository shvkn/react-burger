export const processPending = (state) => {
  state.isLoading = true;
  state.error = null;
};
export const processRejected = (state, { payload: error }) => {
  state.isLoading = false;
  state.error = error;
};
export const processFulfilled = (state) => {
  state.isLoading = false;
  state.error = null;
};
