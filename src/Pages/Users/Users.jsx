import { DeleteIcon, EditIcon, VisibilityIcon, VisibilityOffIcon } from "../../components/Icon/Icon"
import Layout from "../../components/Layout/Layout"
import { Button, AddUserModal, Modal, Text, TextInput, UpdateUser } from "../../tailwind"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { fetchUsers, searchUser, getSingleUser } from "../../redux/slice​/usersSlice"
import toast from "react-hot-toast"
import { deleteUser, updateStatusUser } from "../../http/Apis"
import { setAddUserIsOpen } from "../../redux/slice​/modalSlice"
import { fetchDashboardData } from "../../redux/slice​/dashboardSlice"

const Users = () => {
    const dispatch = useDispatch()
    const { addUserIsOpen } = useSelector(state => state.modal);
    const { singleUser, status: loading } = useSelector(state => state.users);
    const [deleteArray, setDeleteArray] = useState([])
    const [bulkAction, setBulkAction] = useState('none')
    const { data: totaluserData } = useSelector(state => state.dashboard);
    const { users } = totaluserData;
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 20,
    })
    const [status, setStatusLocal] = useState({
        id: '',
        status: false,
    })
    const [deleteId, setDeleteId] = useState(0)
    useEffect(() => {
        dispatch(fetchUsers(pagination.page, pagination.limit))
        dispatch(fetchDashboardData())
    }, [pagination])

    const headlePrev = () => {
        if (pagination.page > 1) {
            setPagination({
                ...pagination,
                page: pagination.page - 1
            })
        } else {
            toast.error("You are on first page")
        }
    }

    const handleNext = () => {
        if (pagination.page < Math.ceil(users / pagination.limit)) {
            setPagination({
                ...pagination,
                page: pagination.page + 1
            })
        } else {
            toast.error("No more posts")
        }
    }
    const { data } = useSelector(state => state.users)

    // headle bulk actions
    const headleBulkActions = async () => {
        if (bulkAction === 'none') {
            toast.error("Please select bulk action")
        }
        if (bulkAction === 'Delete') {
            if (deleteArray.length === 0) {
                toast.error("Please select user")
            } else {
                try {
                    const res = await deleteUser(deleteArray);
                    if (res.data.message === 'User deleted successfully') {
                        dispatch(fetchUsers(pagination.page, pagination.limit))
                        toast.success("User deleted successfully")
                        setDeleteId(0)
                    }
                } catch (e) {
                    console.log(e)
                    toast.error("Something went wrong")
                }
            }
        }
        if (bulkAction === 'Deactivate') {
            if (deleteArray.length === 0) {
                toast.error("Please select user")
            } else {
                const data = {
                    status: false,
                    updateIds: deleteArray
                }
                try {
                    const res = await updateStatusUser(data);
                    if (res.data.message === 'status updated successfully') {
                        dispatch(fetchUsers(pagination.page, pagination.limit))
                        toast.success("Status updated")
                        setDeleteId(0)
                    }
                } catch (e) {
                    console.log(e)
                    toast.error("Something went wrong")
                }
            }
        }

        if (bulkAction === 'Activate') {
            if (deleteArray.length === 0) {
                toast.error("Please select user")
            } else {
                const data = {
                    status: true,
                    updateIds: deleteArray
                }
                try {
                    const res = await updateStatusUser(data);
                    if (res.data.message === 'status updated successfully') {
                        dispatch(fetchUsers(pagination.page, pagination.limit))
                        toast.success("Status updated")
                        setDeleteId(0)
                    }
                } catch (e) {
                    console.log(e)
                    toast.error("Something went wrong")
                }
            }
        }
    }

    // headle search
    const handleSearch = async (e) => {
        const { value } = e.target;
        if (value.length > 0) {
            dispatch(searchUser(value))
        } else {
            dispatch(fetchUsers(pagination.page, pagination.limit))
        }

    }

    // user status update
    const headleStatus = async () => {
        const data = {
            status: !status.status,
            updateIds: [status.id]
        }
        try {
            const res = await updateStatusUser(data);
            if (res.data.message === 'status updated successfully') {
                dispatch(fetchUsers(pagination.page, pagination.limit))
                toast.success("Status updated")
                setStatusLocal({
                    id: '',
                    status: '',
                })
            }
        } catch (e) {
            console.log(e)
            toast.error("Something went wrong")
        }
    }

    // delete user
    const handleDelete = async () => {
        try {
            const res = await deleteUser([deleteId]);
            if (res.data.message === 'User deleted successfully') {
                dispatch(fetchUsers(pagination.page, pagination.limit))
                toast.success("User deleted successfully")
                setDeleteId(0)
            }
        } catch (e) {
            console.log(e)
            toast.error("Something went wrong")
        }
    }

    // headle checkbox
    const headleCheckbox = (e) => {
        const { name: id, checked } = e.target;
        if (id === 'selectAll') {
            if (checked) {
                setDeleteArray(data.map(user => user.id))

            } else {
                setDeleteArray([])
            }
        } else {
            setDeleteArray(prev => {
                if (checked) {
                    return [...prev, id]
                } else {
                    return prev.filter(item => item !== id)
                }
            })
        }

    }

    return (
        <>
            {addUserIsOpen ? <AddUserModal /> : null}
            {addUserIsOpen ? <UpdateUser data={loading === 'secces' && singleUser} /> : null}
            <div className="flex justify-center w-auto">
                <div className="2xl:container w-full flex">
                    <Layout>
                        <div className="flex justify-between items-start">
                            <div className="flex items-center">
                                <Text title={'Users'} />
                                <div className="w-32 ml-5">
                                    <Button
                                        onClick={() => dispatch(setAddUserIsOpen(!addUserIsOpen))}
                                        title={'Add New'}
                                        borderRadius="rounded-full"
                                        height="h-10"
                                        label="my-modal-5"
                                    />
                                </div>
                            </div>
                            <div>
                                <TextInput
                                    placeholder="Search"
                                    onChange={handleSearch}
                                />
                            </div>
                        </div>
                        <div className="mt-5 gap-10 w-full">
                            <div className="flex">
                                <div className="w-screen">
                                    {/* select and data display start */}
                                    <div className="flex items-center mb-3 justify-between">
                                        <div className="flex items-center gap-2">
                                            <select
                                                onChange={(e) => setBulkAction(e.target.value)}
                                                class="border-r-4 py-1 px-1 rounded-md shadow-md">
                                                <option selected>bulk actions</option>
                                                <option>Delete</option>
                                                <option>Deactivate</option>
                                                <option>Activate</option>
                                            </select>

                                            <span onClick={headleBulkActions} className="bg-gray-200 py-1.5 rounded-md shadow-md px-2 text-sm cursor-pointer hover:bg-secondary-blue duration-100 hover:text-white" >Apply</span>
                                        </div>
                                        <div className="opacity-70">
                                            All ({users}) | Active ({data.filter(data => data.status).length}) | Deactive ({data.filter(data => !data.status).length})
                                        </div>
                                    </div>
                                    <div className="overflow-x-auto w-full">
                                        <table className="table w-full">
                                            <thead>
                                                <tr>
                                                    <th>
                                                        <label>
                                                            <input
                                                                type="checkbox"
                                                                className="checkbox"
                                                                name="selectAll"
                                                                checked={deleteArray.length === data.length}
                                                                onChange={headleCheckbox}
                                                            />
                                                        </label>
                                                    </th>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Phone</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    data.map((item, index) => {
                                                        return (
                                                            <tr>
                                                                <th>
                                                                    <label>
                                                                        <input
                                                                            type="checkbox"
                                                                            className="checkbox"
                                                                            name={item.id}
                                                                            onChange={headleCheckbox}
                                                                            checked={deleteArray.includes(item.id)}
                                                                        />
                                                                    </label>
                                                                </th>
                                                                <td>
                                                                    <div className="flex items-center space-x-3">
                                                                        <div className="avatar">
                                                                            <div className="mask mask-squircle w-12 h-12">
                                                                                <img src={item.profile_image ? item.profile_image : "/default.png"} alt="Avatar" />
                                                                            </div>
                                                                        </div>
                                                                        <div>
                                                                            <div className="font-bold capitalize">{item.name}</div>
                                                                            <div className="text-sm w-16 bg-secondary-blue rounded-full text-white flex items-center justify-center">
                                                                                <span className="py-0.5 capitalize">
                                                                                    {item.role}
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="capitalize">
                                                                    {item.email}
                                                                </td>
                                                                <td>{item.phone}</td>
                                                                <th>
                                                                    <div className="flex gap-3">
                                                                        <label htmlFor="headle-status-user"
                                                                            onClick={() => setStatusLocal({
                                                                                id: item.id,
                                                                                status: item.status ? true : false
                                                                            })}
                                                                            className="cursor-pointer">
                                                                            {item.status ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                                                        </label>

                                                                        <label
                                                                            htmlFor="update-user"
                                                                            onClick={() => {
                                                                                dispatch(setAddUserIsOpen(!addUserIsOpen))
                                                                                dispatch(getSingleUser(item.id))
                                                                            }}
                                                                            className="cursor-pointer">
                                                                            <EditIcon />
                                                                        </label>

                                                                        <label onClick={() => setDeleteId(item.id)} htmlFor="headle-delete-user" className="cursor-pointer">
                                                                            <DeleteIcon />
                                                                        </label>
                                                                    </div>
                                                                </th>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <th>
                                                        <label>
                                                        </label>
                                                    </th>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Phone</th>
                                                    <th>Action</th>
                                                </tr>
                                            </tfoot>

                                        </table>

                                        {/* pagination start */}
                                        <div className="my-5 flex items-center justify-end">
                                            <div class="btn-group">
                                                <button
                                                    onClick={headlePrev}
                                                    class="btn bg-secondary-blue hover:bg-blue-900">«</button>
                                                <button class="btn">Page {pagination.page}</button>
                                                <button
                                                    onClick={handleNext}
                                                    class="btn bg-red-700 hover:bg-red-900">»</button>
                                            </div>
                                        </div>
                                        {/* pagination end */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Layout>
                </div>
            </div>

            {/* chagen status start */}
            <input type="checkbox" id="headle-status-user" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Status</h3>
                    <p className="py-2">Are you sure you want to chanege status?</p>
                    <div className="modal-action flex items-center justify-between">
                        <label htmlFor="headle-status-user" onClick={headleStatus} className="btn w-1/2 bg-red-800 hover:bg-red-900">Yes</label>
                        <label htmlFor="headle-status-user" className="btn w-1/2 bg-secondary-blue hover:bg-blue-800">Cancel</label>
                    </div>
                </div>
            </div>
            {/* chagen status end */}

            {/* change delete start */}
            <input type="checkbox" id="headle-delete-user" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Delete</h3>
                    <p className="py-2">Are you sure you want to delete this user?</p>
                    <div className="modal-action flex items-center justify-between">
                        <label htmlFor="headle-delete-user" onClick={handleDelete} className="btn w-1/2 bg-red-800 hover:bg-red-900">Yes</label>
                        <label htmlFor="headle-delete-user" className="btn w-1/2 bg-secondary-blue hover:bg-blue-800">Cancel</label>
                    </div>
                </div>
            </div>
            {/* change delete end */}
        </>
    )
}

export default Users;