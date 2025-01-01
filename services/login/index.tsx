import instance from '../instance';

export const loginUser = async (data: any): Promise<any> =>
  await instance.post('/auth/user/login', data);
