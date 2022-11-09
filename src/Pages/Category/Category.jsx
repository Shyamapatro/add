import {
  DeleteIcon,
  EditIcon,
  VisibilityIcon,
  VisibilityOffIcon,
} from "../../components/Icon/Icon";
import Layout from "../../components/Layout/Layout";
import { Button, Card, Modal, Text, TextInput } from "../../tailwind";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchCategories,
  searchCategory,
} from "../../redux/slice​/categorySlice";
import {
  createCategory,
  updateStatusCategory,
  updateCategory,
  deleteCategory,
} from "../../http/Apis";
import toast from "react-hot-toast";

const Category = () => {
  const dispatch = useDispatch();
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    order: -1,
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatusLocal] = useState({
    id: "",
    published: false,
  });
  const [id, setId] = useState("");
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    dispatch(
      fetchCategories(pagination.page, pagination.limit)
    );
  }, []);
  const { data } = useSelector((state) => state.category);

  // Create a category
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [editSlug, setEditSlug] = useState(false);
  const [hidden, setHidden] = useState(false);

  // url
  const headleUrl = (e) => {
    setTitle(e.target.value);
    const slugUrl = e.target.value.toLowerCase().split(" ").join("-");
    if (editSlug) {
      return;
    }
    setUrl(slugUrl);
  };

  const headleSlug = (e) => {
    const slugUrl = e.target.value.toLowerCase().split(" ").join("-");
    setUrl(slugUrl);
    setEditSlug(true);
    if (setEditSlug === false) {
      setHidden(!hidden);
    }
  };

  const hendleSubmit = async () => {
    setLoading(true);
    try {
      if (edit) {
        const data = {
          id,
          title,
          url,
        };
        try {
          const res = await updateCategory(data);
          if (res.status === 200) {
            toast.success("Update category success");
            dispatch(
              fetchCategories(
                pagination.page,
                pagination.limit,
                pagination.order
              )
            );
            setEdit(false);
            setTitle("");
            setUrl("");
            setEditSlug(false);
            setHidden(false);
            setId("");
            setLoading(false);
          }
        } catch (error) {
          toast.error(error.response.data.message);
        }
      } else {
        if (title.trim() !== "") {
          const res = await createCategory({ title, url });
          if (res.status === 201) {
            toast.success("Create category successfully");
            dispatch(
              fetchCategories(
                pagination.page,
                pagination.limit,
                pagination.order
              )
            );
            setTitle("");
            setUrl("");
            setEditSlug(false);
            setHidden(false);
            setLoading(false);
          }
        } else {
          toast.error("Please enter category name");
          setLoading(false);
        }
      }
    } catch (error) {
      toast.error("Create category failed");
      setLoading(false);
    }
    setLoading(false);
  };

  // headle search
  const handleSearch = async (e) => {
    const { value } = e.target;
    if (value.length > 0) {
      dispatch(searchCategory(value));
    } else {
      dispatch(fetchCategories(pagination.page, pagination.limit));
    }
  };

  // headle Status
  const handleStatus = async () => {
    const data = {
      id: status.id,
      status: !status.published,
    };
    try {
      const response = await updateStatusCategory(data);
      if (response.status === 200) {
        toast.success("Status Updated Successfully");
        dispatch(fetchCategories(pagination.page, pagination.limit, pagination.order));
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // handle delete
  const handleDelete = async () => {
    try {
      const response = await deleteCategory(id);
      if (response.status === 200) {
        toast.success("Section Deleted Successfully");
        dispatch(fetchCategories(pagination.page, pagination.limit));
        setId("");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <>
      <div className="flex justify-center w-auto">
        <div className="2xl:container w-full flex">
          <Layout>
            <Text title={"Add a New Category"} />
            <div className="grid grid-cols-5 mt-5 gap-10 w-full">
              <div className="flex col-span-2">
                <div className="w-screen">
                  <TextInput
                    placeholder="Name"
                    value={title}
                    onChange={headleUrl}
                  />
                  <input
                    type="checkbox"
                    id="category-url"
                    class="modal-toggle"
                  />
                  <div className="modal">
                    <div className="modal-box w-11/12 max-w-5xl">
                      <h3 className="font-bold text-lg">Category URL edit!</h3>
                      <div className="py-4">
                        <TextInput
                          placeholder="Post URL"
                          value={url}
                          onChange={headleSlug}
                        />
                      </div>
                      <div className="modal-action">
                        <label htmlFor="category-url" className="btn">
                          ok!
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="my-3 w-full">
                    <div className="flex flex-wrap">
                      <label
                        htmlFor="category-url"
                        className="opacity-70 tracking-wide inline-block cursor-pointer font-medium"
                      >{`URL: ${process.env.REACT_APP_APP_URL}/${url}`}</label>
                    </div>
                  </div>
                  <Button
                    title={edit ? "Update" : "Add Category"}
                    borderRadius={"rounded-full"}
                    height="mt-8"
                    loading={loading}
                    onClick={hendleSubmit}
                  />
                </div>
              </div>
              <div className="col-span-3">
                <TextInput
                  placeholder="Search"
                  onChange={(e) => handleSearch(e)}
                />
                <div className="mt-5">
                  {data.length > 0 ? (
                    data.map((item, index) => {
                      return (
                        <Card key={item.id}>
                          <div className="flex items-center justify-between">
                            <div>
                              <h1 className="text-2xl font-semibold">
                                {item.title}
                              </h1>
                            </div>
                            <div className="flex gap-3">
                              <label
                                onClick={() =>
                                  setStatusLocal({
                                    id: item.id,
                                    published: item.published ? true : false,
                                  })
                                }
                                htmlFor="headle-status-category"
                                className="cursor-pointer"
                              >
                                {item.published ? (
                                  <VisibilityIcon />
                                ) : (
                                  <VisibilityOffIcon />
                                )}
                              </label>

                              <label
                                onClick={() => {
                                  setTitle(item.title);
                                  setUrl(item.url);
                                  setId(item.id);
                                  setEdit(true);
                                  toast.success("You can edit this section");
                                }}
                                className="cursor-pointer"
                              >
                                <EditIcon />
                              </label>

                              <label
                                onClick={() => setId(item.id)}
                                htmlFor="headle-delete-category"
                                className="cursor-pointer"
                              >
                                <DeleteIcon />
                              </label>
                            </div>
                          </div>
                        </Card>
                      );
                    })
                  ) : (
                    <div className="text-center mt-5">
                      <Text title={"No Categories Found"} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Layout>
        </div>
      </div>

      {/* change status start */}
      <input
        type="checkbox"
        id="headle-status-category"
        className="modal-toggle"
      />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Status</h3>
          <p className="py-2">Are you sure you want to chanege status?</p>
          <div className="modal-action flex items-center justify-between">
            <label
              htmlFor="headle-status-category"
              onClick={handleStatus}
              className="btn w-1/2 bg-red-800 hover:bg-red-900"
            >
              Yes
            </label>
            <label
              htmlFor="headle-status-category"
              className="btn w-1/2 bg-secondary-blue hover:bg-blue-800"
            >
              Cancel
            </label>
          </div>
        </div>
      </div>
      {/* change status end */}

      {/* change delete start */}
      <input
        type="checkbox"
        id="headle-delete-category"
        className="modal-toggle"
      />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delete</h3>
          <p className="py-2">Are you sure you want to delete this category?</p>
          <div className="modal-action flex items-center justify-between">
            <label
              htmlFor="headle-delete-category"
              onClick={handleDelete}
              className="btn w-1/2 bg-red-800 hover:bg-red-900"
            >
              Yes
            </label>
            <label
              htmlFor="headle-delete-category"
              className="btn w-1/2 bg-secondary-blue hover:bg-blue-800"
            >
              Cancel
            </label>
          </div>
        </div>
      </div>
      {/* change delete end */}
    </>
  );
};

export default Category;
