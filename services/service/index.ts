import authInstance from '../authInstance';

export const getServiceInfo = async (): Promise<any> => {
  try {
    const response = await authInstance.get('/service');
    return response.data;
  } catch (error) {
    throw new Error('Failed to login');
  }
};