import { AuthForm } from './types/auth';

const API_URL = 'http://localhost:3000/api';

export const loginUser = async (data: AuthForm) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Invalid credentials');
  }

  return response.json();
};

export const registerUser = async (data: AuthForm) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Registration failed');
  }

  return response.json();
};

export const uploadResume = async (formData: FormData, token: string) => {
  const response = await fetch(`${API_URL}/resume`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload resume');
  }

  return response.json();
};

export const getResumes = async (token: string) => {
  const response = await fetch(`${API_URL}/resume`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch resumes');
  }

  return response.json();
};

export const deleteResume = async (id: number, token: string) => {
  const response = await fetch(`${API_URL}/resume/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete resume');
  }

  return response.json();
};