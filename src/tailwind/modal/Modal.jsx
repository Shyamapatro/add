import { Button } from "../../tailwind";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpen } from "../../redux/slice​/modalSlice";
import { deletePost } from "../../http";
import { updateStatus } from "../../http/Apis";
import toast from "react-hot-toast";
import { TYPES } from "../../redux/slice​/modalSlice";

const Modal = () => {
    const dispatch = useDispatch();
    const { isOpen, title, content, id, actionsType, data } = useSelector(state => state.modal);

    const deleteFromDB = async (api, id, data) => {
        if (actionsType === TYPES.DELETE_POST) {
            try {
                await api(id, data);
                dispatch(setIsOpen({
                    isOpen: !isOpen,
                    title: '',
                    content: '',
                    id: '',
                    actionsType: '',
                    useRun: false
                }))
                toast.success("Post deleted successfully");
            } catch (error) {
                toast.error("Post could not be deleted");
            }
        } else {
            toast.error("Post could not be deleted");
        }
    }

    return (
        <>
            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label onClick={() => dispatch(setIsOpen(!isOpen))} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{title}</h3>
                    <p className="mt-2">{content}</p>
                    <div className="flex gap-5 mt-5 w-full">
                        <span className="w-full" onClick={() => {
                            dispatch(setIsOpen(!isOpen))
                            if (actionsType === TYPES.DELETE_POST) {
                                deleteFromDB(deletePost, id)
                            }
                            if (actionsType === TYPES.POST_STATUS) {
                                deleteFromDB(updateStatus, id, data)
                            }
                        }}>
                            <Button
                                title={'Yes'}
                                borderRadius={'rounded-full'}
                                backgroundColor={'bg-red-800'}
                                hoverBackgroundColor={'hover:bg-red-900'}
                            />
                        </span>
                        <span className="w-full" onClick={() => dispatch(setIsOpen(!isOpen))}>
                            <Button
                                title={'Cancel'}
                                borderRadius={'rounded-full'}
                            />
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal;