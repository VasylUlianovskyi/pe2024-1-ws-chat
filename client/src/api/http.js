import axios from 'axios';

const axiosOptions = {
  baseURL: 'http://127.0.0.1:5000/api',
};

const apiInstance = axios.create(axiosOptions);

export const getMessages = limit => apiInstance.get(`/messages?limit=${limit}`);

export const updateMessage = async (messageId, updatedMessage) => {
  const response = await apiInstance.put(
    `/messages/${messageId}`,
    updatedMessage
  );
  return response;
};

export const deleteMessage = async messageId => {
  const response = await apiInstance.delete(`/messages/${messageId}`);
  return response;
};
