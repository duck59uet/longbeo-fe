import authInstance from '../authInstance';

export const getInfo = async (): Promise<any> => {
  try {
    const response = await authInstance.get('/user');
    return response.data;
  } catch (error) {
    throw new Error('Failed to login');
  }
};

export const updateInfo = async (data: {
  fullname: string;
  avatar: string;
  facebook: string;
}): Promise<any> => {
  try {
    const response = await authInstance.post('/user/update', data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update');
  }
};

export const changePassword = async (data: {
  oldPassword: string;
  newPassword: string;
}): Promise<any> => {
  try {
    const response = await authInstance.post('/user/change-password', data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to change password');
  }
};
