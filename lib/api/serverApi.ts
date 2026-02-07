import { Note } from '@/types/note';
import { api } from './api';
import {
  FetchNotesParams,
  FetchNotesResponse,
  SessionCheck,
} from './clientApi';
import { cookies } from 'next/headers';
import { User } from '@/types/user';
import { AxiosResponse } from 'axios';

// const createServerApi = async () => {
//   const headerStore = await headers();
//   const cookieHeader = headerStore.get('cookie') ?? '';

//   return axios.create({
//     baseURL: process.env.NEXT_PUBLIC_API_URL + '/api',
//     headers: {
//       Cookie: cookieHeader,
//     },
//     withCredentials: true,
//   });
// };

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookie = await cookies();

  const { data } = await api.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookie.toString(),
    },
  });

  return data;
};

export const fetchNotes = async (
  params: FetchNotesParams
): Promise<FetchNotesResponse> => {
  const cookie = await cookies();

  const { data } = await api.get<FetchNotesResponse>('/notes', {
    params,
    headers: {
      Cookie: cookie.toString(),
    },
  });

  return data;
};

export const checkSession = async (): Promise<AxiosResponse<SessionCheck>> => {
  const cookie = await cookies();

  const response = await api.get<SessionCheck>('/auth/session', {
    headers: {
      Cookie: cookie.toString(),
    },
  });

  return response;
};

export const getMe = async (): Promise<User> => {
  const cookie = await cookies();

  const { data } = await api.get<User>('/users/me', {
    headers: {
      Cookie: cookie.toString(),
    },
  });

  return data;
};
