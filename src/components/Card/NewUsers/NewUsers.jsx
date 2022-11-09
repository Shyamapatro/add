import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUsers } from "../../../redux/slice​/usersSlice"

const NewUsers = () => {
    const dispatch = useDispatch()
    const { data, status } = useSelector(state => state.users)

    useEffect(() => {
        dispatch(fetchUsers())
    }, [])
    return (
        <>
            {
                data.map((item, index) => {
                    if (index < 3) {
                        return (
                            <div key={index}>
                                <div className="flex cursor-pointer items-center relative">
                                    <img
                                        className="w-16 h-16 mr-4 rounded-full shadow-2xl object-cover"
                                        src="/default.png"
                                        alt="user"
                                    />
                                    <img
                                        className="w-16 h-16 mr-4 rounded-full shadow-2xl object-cover absolute"
                                        src={item.profile_image === null ? "/default.png" : item.profile_image}
                                    />
                                    <span className="text-lg -mt-2 opacity-70 ">{item.name}</span>
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

export default NewUsers;