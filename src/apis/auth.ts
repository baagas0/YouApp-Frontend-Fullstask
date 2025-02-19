import coreHttps, { CoreHttpResponse } from '@/https/core';
import { map } from 'lodash';

export interface LoginPayload {
  username: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
}

export interface LoginData {
  data: {
    accessToken: string;
  };
}

const login = async (payload: LoginPayload): Promise<LoginData> => {
  const requestBody = {
    email: payload.username,
    username: payload.username,
    password: payload.password,
  };

  // When username is email format, then username set to empty string
  if (payload.username.includes('@')) {
    requestBody.username = '';
  } else {
    requestBody.email = '';
  }

  const res: CoreHttpResponse<LoginResponse> = await coreHttps.post(
    '/api/login',
    requestBody,
  );

  const data = {
    accessToken: res.data.access_token,
  };
  return {
    data,
  };
};

interface RegisterPayload {
  email: string;
  username: string;
  password: string;
}

const register = async (payload: RegisterPayload): Promise<{ message: string }> => {
  const requestBody = {
    email: payload.email,
    username: payload.username,
    password: payload.password,
  };

  const res: CoreHttpResponse<any> = await coreHttps.post(
    '/api/register',
    requestBody,
  );

  return {
    message: res.message,
  };
};

interface ProfileResponse {
  email: string;
  username: string;
  name?: string;
  birthday?: string;
  horoscope?: string;
  zodiac?: string;
  height?: number;
  weight?: number;
  interests: string[];
}

export interface Profile {
  email: string;
  username: string;
  name?: string;
  birthday?: Date;
  horoscope?: string;
  zodiac?: string;
  height?: number;
  weight?: number;
  interests: string[];
}

const profile = async (): Promise<{ data: Profile }> => {
  const res: CoreHttpResponse<ProfileResponse> = await coreHttps.get('/api/getProfile');
  return {
    data: {
      email: res.data.email,
      username: res.data.username,
      name: res.data.name,
      birthday: res.data.birthday ? new Date(res.data.birthday) : undefined,
      horoscope: res.data.horoscope,
      zodiac: res.data.zodiac,
      height: res.data.height,
      weight: res.data.weight,
      interests: map(res.data.interests, (interest) => interest),
    }
  }
};

interface UpdateProfilePayload {
  name?: string;
  birthday?: Date;
  height?: number;
  weight?: number;
  interests?: string[];
}

const updateProfile = async (payload: UpdateProfilePayload) => {
  const requestBody = {
    ...payload,
    birthday: payload.birthday ? payload.birthday.toISOString().split('T')[0] : undefined,
  };

  await coreHttps.put(
    '/api/updateProfile',
    requestBody,
  );
};

const authApi = {
  login,
  register,
  profile,
  updateProfile,
};

export default authApi;
