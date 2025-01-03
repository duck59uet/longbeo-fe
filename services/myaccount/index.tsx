import authInstance from "../authInstance";

export const getInfo = async (): Promise<any> => {
  try {
    const response = await authInstance.get('/user');
    return response.data;
  } catch (error) {
    throw new Error('Failed to login');
  }
};
