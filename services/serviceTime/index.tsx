import authInstance from '../authInstance';
import instance from '../instance';

export const getServiceTimeInfo = async (seriveId: number): Promise<any> => {
  try {
    const response = await instance.get(`/service_time/detail/${seriveId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to get service time info');
  }
};