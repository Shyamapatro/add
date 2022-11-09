import { Button } from "../../tailwind";
import { useDispatch, useSelector } from "react-redux";
import { setAddUserIsOpen } from "../../redux/slice​/modalSlice";
import toast from "react-hot-toast";
import { Form, Input, Select } from "../../tailwind";
import { useEffect, useState } from "react";
import { updateUser } from "../../http";
import { fetchUsers } from "../../redux/slice​/usersSlice";

const UpdateUser = ({ data }) => {
    const { id, name, email, phone, role } = data;
    const dispatch = useDispatch();
    const { addUserIsOpen } = useSelector(state => state.modal);
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        role: "user",
        profile: ""
    });

    useEffect(() => {
        setUserData({
            name: name,
            email: email,
            phone: phone,
            role: role
        });
    }, [data]);

    const dropdown = [
        {
            label: "Admin",
            value: "admin",
            selected: role === "admin" ? true : false
        },
        {
            label: "User",
            value: "user",
            selected: role === "user" ? true : false
        },
        {
            label: "Editor",
            value: "editor",
            selected: role === "editor" ? true : false
        }
    ]

    const fromData = new FormData();
    fromData.append("name", userData.name);
    fromData.append("email", userData.email);
    fromData.append("password", userData.password);
    fromData.append("phone", userData.phone);
    fromData.append("role", userData.role);
    fromData.append("profile_image", userData.profile);

    const handleSubmit = async () => {
        if (userData.name === "" || userData.email === "" || userData.password === "" || userData.phone === "" || userData.role === "") {
            toast.error("Please fill all the fields to register");
        } else {
            try {
                const res = await updateUser(id, fromData);
                if (res.status === 200) {
                    toast.success("User Update successfully");
                    dispatch(fetchUsers())
                    dispatch(setAddUserIsOpen(false));
                }
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }


    }
    return (
        <>
            <input type="checkbox" id="update-user" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box max-w-xl">
                    <h3 className="font-bold text-lg">Update User!</h3>
                    <Form>
                        <div className="py-4">
                            <Input
                                name="name"
                                placeholder="Enter User Name"
                                value={userData.name}
                                onChange={e => setUserData({ ...userData, name: e.target.value })}

                            />
                            <Input
                                name="email"
                                placeholder="Enter User Email"
                                marginVertical="my-3"
                                value={userData.email}
                                onChange={e => setUserData({ ...userData, email: e.target.value })}
                            />
                            <Input
                                name="password"
                                type="password"
                                placeholder="Enter User Password"
                                marginVertical="my-3"
                                value={userData.password}
                                onChange={e => setUserData({ ...userData, password: e.target.value })}
                            />
                            <Input
                                name="phone"
                                placeholder="Enter User Phone"
                                marginVertical="my-3"
                                value={userData.phone}
                                onChange={e => setUserData({ ...userData, phone: e.target.value })}
                            />
                            <Select
                                name="role"
                                data={dropdown}
                                marginVertical="my-3"
                                onChange={e => setUserData({ ...userData, role: e.target.value })}
                            />
                            <Input
                                name="profile_image"
                                type="file"
                                marginVertical="my-3"
                                onChange={e => setUserData({ ...userData, profile: e.target.files[0] })}
                            />

                        </div>
                        <div className="modal-action">
                            <label onClick={() => {
                                dispatch(setAddUserIsOpen(!addUserIsOpen))
                                handleSubmit()
                            }} forhtml="update-user" className="btn">
                                <button type="submit">Update</button>
                            </label>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default UpdateUser;