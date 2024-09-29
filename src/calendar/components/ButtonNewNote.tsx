import useCalendarEvent from "../../hooks/useCalendarEvent";
import useUiStore from "../../hooks/useUiStore";
import { PlusIcon } from '@heroicons/react/24/outline'

const ButtonNewNote = () => {
  const { openModal } = useUiStore();
  const { createNewForm } = useCalendarEvent();

  const handleNewNote = () => {
    createNewForm();
    openModal();
  };

  return (
      <button
        type="button"
        className="w-14 h-14 rounded-full flex items-center justify-center absolute bottom-5 right-5 text-white bg-blue-300 ring-2 ring-blue-400 hover:ring-blue-500 hover:bg-blue-400 z-10"
        onClick={() => handleNewNote()}
      >
        <PlusIcon className="w-full h-full p-2"/>
      </button>
  );
};

export default ButtonNewNote;
