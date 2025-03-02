import authInstance from "../authInstance";

export const getUserLevel = async (): Promise<any> => {
    try {
      const response = await authInstance.get(`/user_level`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to get available time');
    }
  };