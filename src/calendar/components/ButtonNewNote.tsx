import useCalendarEvent from "../../hooks/useCalendarEvent";
import useUiStore from "../../hooks/useUiStore";

const ButtonNewNote = () => {
  const { openModal } = useUiStore();
  const { createNewForm } = useCalendarEvent();

  const handleNewNote = () => {
    createNewForm();
    openModal();
  };

  return (
    <div className="w-14 h-14 rounded-full bg-blue-400 absolute bottom-5 right-5 text-white text-5xl font-bold flex flex-col items-center justify-center ring-1 ring-blue-500 hover:bg-blue-500">
      <button
        type="button"
        className="w-full h-full rounded-full flex items-center justify-center pb-2"
        onClick={() => handleNewNote()}
      >
        +
      </button>
    </div>
  );
};

export default ButtonNewNote;
