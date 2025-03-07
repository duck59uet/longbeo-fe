import authInstance from '../authInstance';

export const createOrder = async (data: {
  link: string;
  quantity: number;
  service: number;
  note?: string | null | undefined;
}): Promise<any> => {
  try {
    const response = await authInstance.post('/order/user/create', data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create order');
  }
};

export const getOrder = async ({
  categoryId,
  page = 1,
  limit = 10
}: {
  categoryId ?: number | null;
  page?: number;
  limit?: number;
}): Promise<any> => {
  try {
    const response = await authInstance.get(`/order/user/history?categoryId=${categoryId}&limit=${limit}&page=${page}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to get order history');
  }
};
