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

export const getTopupHistory = async (params: {
  pageSize : number;
  pageIndex : number;
}): Promise<any> => {
  try {
    const response = await authInstance.get('/topup/user/history', {
      params
    });
    return response.data;
  } catch (error) {
    console.log('error1', error);
    throw new Error('Failed to get topup history');
  }
}
