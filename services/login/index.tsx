import instance from '../instance';

export const loginUser = async (data: {
  username: string;
  password: string;
}): Promise<any> => {
  try {
    const response = await instance.post('/auth/user/login', data);
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to login');
  }
};
