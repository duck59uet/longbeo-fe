import instance from '../instance';

export const signUpUser = async (data: {
  userName: string;
  fullName: string;
  email: string;
  password: string;
}): Promise<any> => {
  try {
    const response = await instance.post('/user/create', data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create user');
  }
};
