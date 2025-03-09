import instance from '../instance';

export const getServiceInfo = async (seriveId: number): Promise<any> => {
  try {
    const response = await instance.get(`/service/${seriveId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to get service info');
  }
};