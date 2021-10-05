import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { AppState } from '../store';
import { PersonStore } from '../../helper';

const initialState: PersonStore = { person: [], token: '' };

export const personSlice = createSlice({
  name: 'person',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setPerson: (state, action: PayloadAction<PersonStore>) => {
      state.person = action.payload.person;
      state.token = action.payload.token;
    },
  },
});
export const { setPerson } = personSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state.
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getPerson = (state: AppState) => {
  return { state };
};

export default personSlice.reducer;
