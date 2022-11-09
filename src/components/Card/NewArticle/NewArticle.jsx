import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchPosts } from "../../../redux/slice​/postSlice"

const NewArticle = ({ open }) => {
    const dispatch = useDispatch()
    const { data, status } = useSelector(state => state.post)

    useEffect(() => {
        dispatch(fetchPosts())
    }, [])

    return (
        <>
            {
                data.map((item, index) => {
                    if (index < 5) {
                        return (
                            <div key={index}>
                                <div className="flex cursor-pointer">
                                    <img
                                        className="w-20 h-14 mr-2 rounded-md shadow-2xl object-cover"
                                        src={item.thumbnail}
                                    />
                                    <span className={`text-xs opacity-70 flex flex-wrap leading-5 ${open ? 'w-48' : 'w-96'} line-clamp-3`}>
                                        {item.title}
                                    </span>
                                </div>
                                <hr className="my-3" />
                            </div>
                        )
                    } else {
                        return null;
                    }

                })
            }
        </>
    )
}

export default NewArticle;