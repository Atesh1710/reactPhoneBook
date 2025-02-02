// contactsSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { 
  fetchContacts as apiFetchContacts,
  createContact as apiCreateContact,
  updateContact as apiUpdateContact,
  deleteContact as apiDeleteContact,
  toggleBookmark as apiToggleBookmark
} from '../api';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async ({ page, search, label }) => await apiFetchContacts(page, search, label)
);

export const createContact = createAsyncThunk(
  'contacts/createContact',
  async ({ contactData, page, search, label }, { dispatch }) => {
    await apiCreateContact(contactData);
    dispatch(fetchContacts({ page, search, label }));
  }
);

export const updateContact = createAsyncThunk(
  'contacts/updateContact',
  async ({ id, contactData, page, search, label }, { dispatch }) => {
    await apiUpdateContact(id, contactData);
    dispatch(fetchContacts({ page, search, label }));
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async ({ id, page, search, label }, { dispatch }) => {
    await apiDeleteContact(id);
    dispatch(fetchContacts({ page, search, label }));
  }
);

export const toggleBookmark = createAsyncThunk(
  'contacts/toggleBookmark',
  async ({ id, page, search, label }, { dispatch }) => {
    await apiToggleBookmark(id);
    dispatch(fetchContacts({ page, search, label }));
  }
);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    data: [],
    status: 'idle'
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = action.payload;
      });
  }
});

export default contactsSlice.reducer;