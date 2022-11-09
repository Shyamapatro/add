import { DeleteIcon, EditIcon, VisibilityIcon, VisibilityOffIcon } from "../../components/Icon/Icon"
import Layout from "../../components/Layout/Layout"
import { Button, Text, TextInput } from "../../tailwind"
import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { deletePost, updateStatus } from "../../http/Apis"
import { fetchPosts, searchPost, setStatus } from "../../redux/slice​/postSlice"
import { useDispatch, useSelector } from "react-redux"
import { fetchDashboardData, STATUS } from "../../redux/slice​/dashboardSlice"

const Posts = () => {
    const [deleteArray, setDeleteArray] = useState([])
    const [bulkAction, setBulkAction] = useState('none')
    const dispatch = useDispatch()
    const { data: posts, status: loading } = useSelector(state => state.post)
    const { data: totalPostData } = useSelector(state => state.dashboard);
    const { total } = totalPostData;
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 20,
    })
    const [status, setStatusLocal] = useState({
        id: '',
        published: false,
    })
    const [deleteId, setDeleteId] = useState(0)

    useEffect(() => {
        dispatch(setStatus(STATUS.LOADING))
        dispatch(fetchDashboardData())
        dispatch(fetchPosts(pagination.page, pagination.limit))
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
        if (pagination.page < Math.ceil(total / pagination.limit)) {
            setPagination({
                ...pagination,
                page: pagination.page + 1
            })
        } else {
            toast.error("No more posts")
        }
    }

    // post status update
    const headleStatus = async () => {
        const data = {
            published: !status.published,
            updateIds: [status.id]
        }
        try {
            const res = await updateStatus(data);
            if (res.data.message === 'status updated successfully') {
                dispatch(fetchPosts(pagination.page, pagination.limit))
                toast.success("Status updated")
                setStatusLocal({
                    id: '',
                    published: '',
                })
            }
        } catch (e) {
            console.log(e)
            toast.error("Something went wrong")
        }
    }

    // delete post
    const handleDelete = async () => {
        try {
            const res = await deletePost([deleteId]);
            if (res.data.message === 'post deleted successfully') {
                dispatch(fetchPosts(pagination.page, pagination.limit))
                toast.success("Post deleted successfully")
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
                setDeleteArray(posts.map(post => post.id))

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

    // headle bulk actions
    const headleBulkActions = async () => {
        if (bulkAction === 'none') {
            toast.error("Please select bulk action")
        }
        if (bulkAction === 'Delete') {
            if (deleteArray.length === 0) {
                toast.error("Please select post")
            } else {
                try {
                    const res = await deletePost(deleteArray);
                    if (res.data.message === 'post deleted successfully') {
                        dispatch(fetchPosts(pagination.page, pagination.limit))
                        toast.success("Post deleted successfully")
                        setDeleteId(0)
                    }
                } catch (e) {
                    console.log(e)
                    toast.error("Something went wrong")
                }
            }
        }
        if (bulkAction === 'UnPublish') {
            if (deleteArray.length === 0) {
                toast.error("Please select post")
            } else {
                const data = {
                    published: false,
                    updateIds: deleteArray
                }
                try {
                    const res = await updateStatus(data);
                    if (res.data.message === 'status updated successfully') {
                        dispatch(fetchPosts(pagination.page, pagination.limit))
                        toast.success("Status updated")
                        setDeleteId(0)
                    }
                } catch (e) {
                    console.log(e)
                    toast.error("Something went wrong")
                }
            }
        }

        if (bulkAction === 'Publish') {
            if (deleteArray.length === 0) {
                toast.error("Please select post")
            } else {
                const data = {
                    published: true,
                    updateIds: deleteArray
                }
                try {
                    const res = await updateStatus(data);
                    if (res.data.message === 'status updated successfully') {
                        dispatch(fetchPosts(pagination.page, pagination.limit))
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
            dispatch(searchPost(value))
        } else {
            dispatch(fetchPosts(pagination.page, pagination.limit))
        }

    }

    return (
        <>
            <div className="flex justify-center w-auto">
                <div className="2xl:container w-full flex">
                    <Layout>
                        <div className="flex justify-between items-start">
                            <div className="flex items-center">
                                <Text title={'All Articles'} />
                                <div className="w-32 ml-5">
                                    <Link to={'/admin/add-post'}>
                                        <Button
                                            title={'Add New'}
                                            borderRadius="rounded-full"
                                            height="h-10"
                                        />
                                    </Link>
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
                                                <option>UnPublish</option>
                                                <option>Publish</option>
                                            </select>

                                            <span onClick={headleBulkActions} className="bg-gray-200 py-1.5 rounded-md shadow-md px-2 text-sm cursor-pointer hover:bg-secondary-blue duration-100 hover:text-white" >Apply</span>
                                        </div>
                                        <div className="opacity-70">
                                            All ({posts.length}) | Published ({posts.filter(post => post.published).length}) | Unpublished ({posts.filter(post => !post.published).length})
                                        </div>
                                    </div>


                                    {/* select and data display end */}
                                    <div className="overflow-x-auto w-full">
                                        {
                                            posts.length > 0 ? <table className="table w-full">
                                                <thead>
                                                    <tr>
                                                        <th>
                                                            <label>
                                                                <input
                                                                    type="checkbox"
                                                                    className="checkbox"
                                                                    name="selectAll"
                                                                    checked={deleteArray.length === posts.length}
                                                                    onChange={headleCheckbox}
                                                                />
                                                            </label>
                                                        </th>
                                                        <th>Title</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        posts.map((post) => {
                                                            return (
                                                                <tr key={post.id}>
                                                                    <th>
                                                                        <label>
                                                                            <input
                                                                                type="checkbox" className="checkbox"
                                                                                name={post.id}
                                                                                onChange={headleCheckbox}
                                                                                checked={deleteArray.includes(post.id)}
                                                                            />
                                                                        </label>
                                                                    </th>
                                                                    <td>
                                                                        <div className="flex items-center space-x-3">
                                                                            <div className="avatar">
                                                                                <div className="mask mask-squircle w-12 h-12">
                                                                                    <img src={post.thumbnail} alt="Avatar" />
                                                                                </div>
                                                                            </div>
                                                                            <div className="max-w-2xl">
                                                                                <div className="font-bold">
                                                                                    <p className="line-clamp-1">
                                                                                        {post.title}
                                                                                    </p>
                                                                                </div>
                                                                                <div className="text-sm w-16 bg-secondary-blue rounded-full text-white flex items-center justify-center">
                                                                                    <span className="py-0.5 capitalize">
                                                                                        {post.type}
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <th>
                                                                        <div className="flex gap-3">
                                                                            <label htmlFor="headle-status" onClick={() => setStatusLocal({
                                                                                id: post.id,
                                                                                published: post.published ? true : false
                                                                            })} className="cursor-pointer">
                                                                                {post.published ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                                                            </label>

                                                                            <Link to={`/admin/edit-post/${post.id}`}>
                                                                                <label className="cursor-pointer">
                                                                                    <EditIcon />
                                                                                </label>
                                                                            </Link>

                                                                            <label onClick={() => setDeleteId(post.id)} htmlFor="headle-delete" className="cursor-pointer">
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
                                                                <input
                                                                    type="checkbox"
                                                                    className="checkbox"
                                                                    name="selectAll"
                                                                    checked={deleteArray.length === posts.length}
                                                                    onChange={headleCheckbox}
                                                                />
                                                            </label>
                                                        </th>
                                                        <th>Title</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </tfoot>
                                            </table> : <div className="h-full mt-52">
                                                <div className="flex items-center w-full h-full justify-center">
                                                    {
                                                        loading === 'loading' ? <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div> : <Text title={'No Posts Found'} />
                                                    }
                                                </div>
                                            </div>
                                        }
                                    </div>
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
                    </Layout>
                </div>
            </div>

            {/* chagen status start */}
            <input type="checkbox" id="headle-status" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Status</h3>
                    <p className="py-2">Are you sure you want to chanege status?</p>
                    <div className="modal-action flex items-center justify-between">
                        <label htmlFor="headle-status" onClick={headleStatus} className="btn w-1/2 bg-red-800 hover:bg-red-900">Yes</label>
                        <label htmlFor="headle-status" className="btn w-1/2 bg-secondary-blue hover:bg-blue-800">Cancel</label>
                    </div>
                </div>
            </div>
            {/* chagen status end */}

            {/* change delete start */}
            <input type="checkbox" id="headle-delete" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Delete</h3>
                    <p className="py-2">Are you sure you want to delete this post?</p>
                    <div className="modal-action flex items-center justify-between">
                        <label htmlFor="headle-delete" onClick={handleDelete} className="btn w-1/2 bg-red-800 hover:bg-red-900">Yes</label>
                        <label htmlFor="headle-delete" className="btn w-1/2 bg-secondary-blue hover:bg-blue-800">Cancel</label>
                    </div>
                </div>
            </div>
            {/* change delete end */}
        </>
    )
}

export default Posts;