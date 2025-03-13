import instance from '../instance';

export const getNewsByCatogeryId = async (catogeryId: number): Promise<any> => {
  try {
    const response = await instance.get('/news/user/get/' + catogeryId);
    return response.data;
  } catch (error) {
    throw new Error('Failed to get news');
  }
};
