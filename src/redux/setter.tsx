import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface setterState {
  value: string
}

const initialState: setterState = {
  value: '',
}

export const counterSlice = createSlice({
  name: 'setter',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { set } = counterSlice.actions

export default counterSlice.reducer