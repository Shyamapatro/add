import {
  DeleteIcon,
  EditIcon,
  VisibilityIcon,
  VisibilityOffIcon,
} from "../../components/Icon/Icon";
import Layout from "../../components/Layout/Layout";
import { Button, Card, Text, TextInput, Modal } from "../../tailwind";
import { useDispatch, useSelector } from "react-redux";
import { fetchSections, searchSection } from "../../redux/slice​/sectionSlice";
import { fetchCategories } from "../../redux/slice​/categorySlice";
import { useEffect, useState } from "react";
import {
  createSection,
  deleteSection,
  updateStatusSection,
  updateSection,
} from "../../http/Apis";
import toast from "react-hot-toast";

const Sections = () => {
  const dispatch = useDispatch();
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  });
  useEffect(() => {
    dispatch(fetchSections(pagination.page, pagination.limit));
    dispatch(fetchCategories());
  }, []);
  const [loading, setLoading] = useState(false);
  const [sectionId, setSectionId] = useState(null);
  const [edit, setEdit] = useState(false);
  const [status, setStatusLocal] = useState({
    id: "",
    published: false,
  });
  const { data } = useSelector((state) => state.section);
  const { data: category } = useSelector((state) => state.category);
console.log("-----------------category", category )
  // Create Section
  const [sectionData, setSectionData] = useState({
    id: "",
    title: "",
    category: "",
    style: "",
    type: "",
  });

  const handleCreateSection = async () => {
    setLoading(true);
    if (edit) {
      const response = await updateSection(sectionData);
      if (response.status === 200) {
        toast.success("Update status success");
        dispatch(fetchSections(pagination.page, pagination.limit));
        setEdit(false);
        setLoading(false);
        setSectionData({
          id: "",
          title: "",
          category: "",
          style: "",
          type: "",
        });
        return;
      } else {
        toast.error("Update failed");
        setLoading(false);
        return;
      }
    } else {
      if (
        sectionData.title &&
        sectionData.category &&
        sectionData.style &&
        sectionData.type
      ) {
        try {
          const data = {
            title: sectionData.title,
            category: sectionData.category,
            style: sectionData.style,
            type: sectionData.type,
          };
          const response = await createSection(data);
          if (response.status === 201) {
            setLoading(false);
            toast.success("Section Created Successfully");
            setSectionData({
              title: "",
              category: "",
              style: "",
              type: "",
            });
            dispatch(fetchSections(pagination.page, pagination.limit));
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        setLoading(false);
        toast.error("Please fill all the fields");
      }
    }
  };

  // headle search
  const handleSearch = async (e) => {
    const { value } = e.target;
    if (value.length > 0) {
      dispatch(searchSection(value));
    } else {
      dispatch(fetchSections(pagination.page, pagination.limit));
    }
  };

  // handle delete
  const handleDelete = async () => {
    try {
      const response = await deleteSection(sectionId);
      if (response.status === 200) {
        toast.success("Section Deleted Successfully");
        dispatch(fetchSections(pagination.page, pagination.limit));
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // headle Status
  const handleStatus = async () => {
    const data = {
      id: status.id,
      status: !status.published,
    };
    try {
      const response = await updateStatusSection(data);
      if (response.status === 200) {
        toast.success("Status Updated Successfully");
        dispatch(fetchSections(pagination.page, pagination.limit));
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
            <Text title={"Add a New Section"} />
            <div className="grid grid-cols-5 mt-5 gap-10 w-full">
              <div className="flex col-span-2">
                <div className="w-screen">
                  <TextInput
                    placeholder={"Title"}
                    marginVertical={"mb-5"}
                    value={sectionData.title}
                    onChange={(e) =>
                      setSectionData({ ...sectionData, title: e.target.value })
                    }
                  />
                  <select
                    class="select select-bordered w-full bg-white-200 text-gray-900 border border-gray-200 rounded leading-tight focus:outline-none focus:bg-white shadow text-base mb-5"
                    value={sectionData.category}
                    onChange={(e) =>
                      setSectionData({
                        ...sectionData,
                        category: e.target.value,
                      })
                    }
                  >
                    <option selected>Select a category</option>
                    {category.length > 0 &&
                      category.map((item) => {
                        return <option value={item.title}>{item.title}</option>;
                      })}
                  </select>

                  <select
                    class="select select-bordered w-full bg-white-200 text-gray-900 border border-gray-200 rounded leading-tight focus:outline-none focus:bg-white shadow text-base mb-5"
                    value={sectionData.style}
                    onChange={(e) =>
                      setSectionData({ ...sectionData, style: e.target.value })
                    }
                  >
                    <option selected>Select a style</option>
                    <option>style 1</option>
                    <option>style 2</option>
                  </select>

                  <select
                    class="select select-bordered w-full bg-white-200 text-gray-900 border border-gray-200 rounded leading-tight focus:outline-none focus:bg-white shadow text-base mb-5"
                    value={sectionData.type}
                    onChange={(e) =>
                      setSectionData({ ...sectionData, type: e.target.value })
                    }
                  >
                    <option selected>Select a type</option>
                    <option>Article</option>
                    <option>Video</option>
                  </select>

                  <Button
                    height="auto"
                    title={edit ? "Update Section" : "Add Section"}
                    borderRadius={"rounded-full"}
                    onClick={() => handleCreateSection()}
                    loading={loading}
                  />
                </div>
              </div>
              <div className="col-span-3">
                <TextInput
                  placeholder={"Search"}
                  marginVertical={"mb-5"}
                  onChange={(e) => handleSearch(e)}
                />

                {data.length > 0 ? (
                  data.map((item, index) => {
                    return (
                      <Card key={item.id}>
                        <div className="grid grid-cols-2">
                          <div>
                            <h6 className="font-semibold text-xl">
                              <span className="text-primary font-semibold text-xl">
                                Title:{" "}
                              </span>
                              {item.title}
                            </h6>
                            <h6 className="font-semibold text-xl mt-4">
                              <span className="text-primary font-semibold text-xl">
                                Category:{" "}
                              </span>
                              {item.category}
                            </h6>
                            <h6 className="font-semibold text-xl mt-4">
                              <span className="text-primary font-semibold text-xl">
                                Style:{" "}
                              </span>
                              {item.style}
                            </h6>
                            <h6 className="font-semibold text-xl mt-4">
                              <span className="text-primary font-semibold text-xl">
                                Type:{" "}
                              </span>
                              {item.type}
                            </h6>
                          </div>
                          <div className="flex justify-end">
                            <div className="flex flex-col justify-between">
                              <div className="flex justify-end">
                                <label
                                  onClick={() => setSectionId(item.id)}
                                  htmlFor="headle-delete-section"
                                  className="cursor-pointer"
                                >
                                  <DeleteIcon />
                                </label>
                              </div>
                              <div className="flex">
                                <label
                                  onClick={() =>
                                    setStatusLocal({
                                      id: item.id,
                                      published: item.published ? true : false,
                                    })
                                  }
                                  htmlFor="headle-status-section"
                                  className="cursor-pointer mr-3"
                                >
                                  {item.published ? (
                                    <VisibilityIcon />
                                  ) : (
                                    <VisibilityOffIcon />
                                  )}
                                </label>
                                <label
                                  onClick={() => {
                                    setSectionData({
                                      id: item.id,
                                      title: item.title,
                                      category: item.category,
                                      style: item.style,
                                      type: item.type,
                                    });
                                    setEdit(true);
                                    toast.success("You can edit this section");
                                  }}
                                  className="cursor-pointer"
                                >
                                  <EditIcon />
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    );
                  })
                ) : (
                  <div className="flex justify-center">
                    <Text title={"No Section Found"} />
                  </div>
                )}
              </div>
            </div>
          </Layout>
        </div>
      </div>

      {/* change delete start */}
      <input
        type="checkbox"
        id="headle-delete-section"
        className="modal-toggle"
      />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delete</h3>
          <p className="py-2">Are you sure you want to delete this section?</p>
          <div className="modal-action flex items-center justify-between">
            <label
              htmlFor="headle-delete-section"
              onClick={handleDelete}
              className="btn w-1/2 bg-red-800 hover:bg-red-900"
            >
              Yes
            </label>
            <label
              htmlFor="headle-delete-section"
              className="btn w-1/2 bg-secondary-blue hover:bg-blue-800"
            >
              Cancel
            </label>
          </div>
        </div>
      </div>
      {/* change delete end */}

      {/* change status start */}
      <input
        type="checkbox"
        id="headle-status-section"
        className="modal-toggle"
      />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Status</h3>
          <p className="py-2">Are you sure you want to chanege status?</p>
          <div className="modal-action flex items-center justify-between">
            <label
              htmlFor="headle-status-section"
              onClick={handleStatus}
              className="btn w-1/2 bg-red-800 hover:bg-red-900"
            >
              Yes
            </label>
            <label
              htmlFor="headle-status-section"
              className="btn w-1/2 bg-secondary-blue hover:bg-blue-800"
            >
              Cancel
            </label>
          </div>
        </div>
      </div>
      {/* change status end */}
    </>
  );
};

export default Sections;
