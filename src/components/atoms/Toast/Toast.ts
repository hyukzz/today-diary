import { toast } from 'react-toastify';

export const notification = (status: string, text: string) => {
  if (status === 'success') {
    return toast.success(text);
  }

  if (status === 'error') {
    return toast.error(text);
  }

  if (status === 'warning') {
    return toast.warning(text);
  }
};
