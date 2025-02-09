import instance from '../instance';

export const signUpUser = async (data: {
  username: string;
  fullname: string;
  email: string;
  password: string;
  phone: string;
  referUser?: string;
}): Promise<any> => {
  try {
    const response = await instance.post('/user/create', data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create user');
  }
};
