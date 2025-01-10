import {toast} from 'react-toastify';
import {Toast} from '../../components/toast';

export const showToast = (message: string) => {
  toast(<Toast message={message}/>);
};
