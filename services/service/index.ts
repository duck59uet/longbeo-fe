import authInstance from '../authInstance';

export const getServiceInfo = async (seriveId: number): Promise<any> => {
  try {
    const response = await authInstance.get(`/service/${seriveId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to login');
  }
};