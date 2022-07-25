import modalState from '../store/modal';
import { useSetRecoilState } from 'recoil';

const useModal = () => {
  const setModal = useSetRecoilState(modalState);
  return { setModal };
};

export default useModal;
