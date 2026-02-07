import { User } from '@/types/user';
import { api } from './api';
import type { Note } from '@/types/note';

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
  tag?: string;
}

export interface CreateNoteParams {
  title: string;
  content: string;
  tag: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface RegisterUser {
  password: string;
  email: string;
}

export interface SessionCheck {
  success: boolean;
}

export interface Logout {
  status: number;
}

export interface UpdateUser {
  username: string;
}

export const fetchNotes = async (
  params: FetchNotesParams
): Promise<FetchNotesResponse> => {
  const { data } = await api.get<FetchNotesResponse>('/notes', {
    params,
  });

  return data;
};

export const createNote = async (newNote: CreateNoteParams): Promise<Note> => {
  const { data } = await api.post<Note>('/notes', newNote);

  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await api.delete<Note>(`/notes/${id}`);

  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);

  return data;
};

export const register = async ({
  email,
  password,
}: RegisterUser): Promise<User> => {
  const { data } = await api.post<User>('/auth/register', { email, password });

  return data;
};

export const login = async ({
  email,
  password,
}: RegisterUser): Promise<User> => {
  const { data } = await api.post<User>('/auth/login', { email, password });

  return data;
};

export const checkSession = async (): Promise<boolean> => {
  const { data } = await api.get<SessionCheck>('/auth/session');

  return data.success;
};

export const getMe = async (): Promise<User> => {
  const { data } = await api.get<User>('/users/me');

  return data;
};

export const logout = async (): Promise<Logout> => {
  const { data } = await api.post<Logout>('/auth/logout');

  return data;
};

export const updateMe = async ({ username }: UpdateUser): Promise<User> => {
  const { data } = await api.patch<User>('/users/me', { username });

  return data;
};
