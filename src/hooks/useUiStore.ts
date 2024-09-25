import { useAppDispatch, useAppSelector } from "../store/hooks";
import { closeUI, IsOpenModal, openUI } from "../store/slices/uiSlice";

const useUiStore = () => {
  const dispatch = useAppDispatch();
  const closeModal = () => dispatch(closeUI());
  const openModal = () => dispatch(openUI());
  const stateModal = useAppSelector(IsOpenModal);

  return {
    openModal,
    closeModal,
    stateModal,
  };
};

export default useUiStore;
