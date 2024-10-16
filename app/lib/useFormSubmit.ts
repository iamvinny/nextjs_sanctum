import { useState } from 'react';
import axios from '@/lib/axios';

function useFormSubmit() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
    method: 'GET' | 'POST',
    url: string
  ) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false); // Reset success state on new submission

    try {
      const formData = new FormData(event.currentTarget);

      let responseData;

      if (method === 'POST') {
        const response = await axios.post(url, formData);
        responseData = response.data;
      } else if (method === 'GET') {
        // Convert FormData to a plain object
        const params: { [key: string]: any } = {};
        formData.forEach((value, key) => {
          params[key] = value;
        });

        const response = await axios.get(url, { params });
        responseData = response.data;
      } else {
        // Handle unsupported methods
        throw new Error(`Unsupported method: ${method}`);
      }

      // Handle response data if necessary
      // You can process responseData here

      setSuccess(true); // Set success state to true

      // Optionally, reset the form fields
      // event.currentTarget.reset();

    } catch (error: any) {
      // Check if error response exists in axios error object
      if (error.response && error.response.data) {
        // Server responded with a status code outside 2xx range
        setError(error.response.data.message || 'An error occurred.');
      } else if (error.request) {
        // Request was made but no response received
        setError('No response from server. Please try again later.');
      } else {
        // Something else happened
        setError(error.message);
      }
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return { handleSubmit, isLoading, error, success };
}

export default useFormSubmit;