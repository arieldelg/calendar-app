import { TrashIcon } from '@heroicons/react/24/outline'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { ActiveStateSelector } from '../../store/slices/calendarSlice'
import { startDeleteNote } from '../../store/calendarThunk/thunk'

const ButtonDelete = () => {
  const active = useAppSelector(ActiveStateSelector)
  const dispatch = useAppDispatch()
  const handleDelete = () => { 
    dispatch(startDeleteNote(active?._id as string))
   }
  return (
    <button 
    className="absolute bottom-5 w-14 h-14 z-10 rounded-full bg-red-400 left-5 ring-2 ring-red-600 hover:bg-red-500 hover:ring-red-700 flex flex-col items-center justify-center"
    onClick={() => handleDelete()}
    >
        <TrashIcon className="w-full p-2 text-white"/>
    </button>
  )
}

export default ButtonDelete