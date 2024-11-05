import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { http } from '../../api';

const MESSAGES_SLICE_NAME = 'messages';

export const getMessagesThunk = createAsyncThunk(
  `${MESSAGES_SLICE_NAME}/get`,
  async (payload, thunkAPI) => {
    try {
      const response = await http.getMessages(payload);
      return response.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue({ message: err.message });
    }
  }
);

export const updateMessageThunk = createAsyncThunk(
  `${MESSAGES_SLICE_NAME}/update`,
  async ({ messageId, updatedBody }, thunkAPI) => {
    try {
      const response = await http.updateMessage(messageId, {
        body: updatedBody,
      });
      return response.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue({ message: err.message });
    }
  }
);

export const deleteMessageThunk = createAsyncThunk(
  `${MESSAGES_SLICE_NAME}/delete`,
  async (messageId, thunkAPI) => {
    try {
      await http.deleteMessage(messageId);
      return messageId;
    } catch (err) {
      return thunkAPI.rejectWithValue({ message: err.message });
    }
  }
);

const initialState = {
  messages: [],
  isFetching: false,
  error: null,
  limit: 100,
};

const messagesSlice = createSlice({
  name: MESSAGES_SLICE_NAME,
  initialState,
  reducers: {
    newMessagePending (state, { payload }) {
      state.isFetching = true;
      state.error = null;
    },
    newMessageSuccess (state, { payload }) {
      state.isFetching = false;
      if (state.messages.length >= state.limit) {
        state.messages.splice(0, 1);
      }
      state.messages.push(payload);
      state.error = null;
    },
    newMessageError (state, { payload }) {
      state.isFetching = false;
      state.error = payload;
    },
  },
  extraReducers: builder => {
    // GET
    builder.addCase(getMessagesThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(getMessagesThunk.fulfilled, (state, { payload }) => {
      state.messages = [];
      state.isFetching = false;
      state.messages.push(...payload.reverse());
    });
    builder.addCase(getMessagesThunk.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.error = payload;
    });

    // UPDATE

    builder.addCase(updateMessageThunk.fulfilled, (state, { payload }) => {
      const index = state.messages.findIndex(
        message => message._id === payload._id
      );
      if (index !== -1) {
        state.messages[index] = payload;
      }
    });
    builder.addCase(updateMessageThunk.rejected, (state, { payload }) => {
      state.error = payload;
    });

    // DELETE

    builder.addCase(
      deleteMessageThunk.fulfilled,
      (state, { payload: messageId }) => {
        state.messages = state.messages.filter(
          message => message._id !== messageId
        );
      }
    );
    builder.addCase(deleteMessageThunk.rejected, (state, { payload }) => {
      state.error = payload;
    });
  },
});

const { reducer, actions } = messagesSlice;
export const { newMessagePending, newMessageSuccess, newMessageError } =
  actions;

export default reducer;
