import React, { useState } from "react";
import MenuIcon from '../../assets/img/menu.png'
import {
    ActiveIcon,
    ArticleIcon,
    CategoryIcon,
    HomeIcon,
    SectionIcon,
    SettingIcon,
    UserIcon,
    LogoutIcon
} from "../Icon/Icon";
import { Link, Navigate, useLocation } from "react-router-dom";
import Menu from "../../data/Menu";
import { NewArticle, NewUsers } from "../Card";

import { useDispatch, useSelector } from "react-redux";
import { setIsOpen } from "../../redux/slice​/modalSlice";
import { Button, Modal } from "../../tailwind";
import toast from "react-hot-toast";
import { setAuth } from "../../redux/slice​/authSlice";
import { logoutUser } from "../../http";

const Layout = ({ children, hideRightBar = true }) => {
    const [open, setOpen] = useState(true);
    const [logout, setLogOut] = useState(false);
    const { user } = useSelector(state => state.auth);
    const { data } = useSelector(state => state.settings);

    const location = useLocation();
    const { pathname } = location;

    const handleLogout = () => {
        setLogOut(true);
    }

    const Modal = () => {
        const dispatch = useDispatch();
        const { isOpen, title, content } = useSelector(state => state.modal);

        const handleLogoutTwo = async () => {
            try {
                const response = await logoutUser();
                if (response.status === 200) {
                    toast.success("Logout successfully");
                    window.location.href = "/";
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    dispatch(setAuth(null));
                }
            } catch (error) {
                toast.error(error.response.data.message && 'Something went wrong');
                console.log(error.response.data.message);
            }
        }
        return (
            <>
                <input type="checkbox" id="my-modal-3" className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box relative">
                        <label onClick={() => setLogOut(!logout)} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                        <h3 className="text-lg font-bold">Logout</h3>
                        <p className="mt-2">Are you sure you want to logout?</p>
                        <div className="flex gap-5 mt-5 w-full">
                            <span className="w-full" onClick={() => {
                                setLogOut(!logout)
                                handleLogoutTwo()
                            }}>
                                <Button
                                    title={'Yes'}
                                    borderRadius={'rounded-full'}
                                    backgroundColor={'bg-red-800'}
                                    hoverBackgroundColor={'hover:bg-red-900'}
                                />
                            </span>
                            <span className="w-full" onClick={() => setLogOut(!logout)}>
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

    const design = (
        <>
            {logout && <Modal />}
            <div className="flex">
                {/* sidebar start */}
                <div className={` ${open ? "w-72" : "w-0"} bg-white h-screen fixed drop-shadow-2xl duration-300`}>
                    <div className={`flex justify-between p-5 pt-3 mt-5`}>
                        <div className="cursor-pointer -mt-0.5 ml-2">
                            <img
                                src={MenuIcon}
                                className={`cursor-pointer  ${!open && "rotate-180"} w-6`}
                                onClick={() => setOpen(!open)}
                            />
                        </div>
                        <div className="w-24 mr-1">
                            <img
                                src={data.web_logo}
                                alt="logo"
                            />
                        </div>
                    </div>
                    <div className="mt-8">
                        <ul>
                            {
                                Menu.length > 0 && Menu.map((item, index) => {
                                    return (
                                        <Link key={index} to={item.path}>
                                            <li className="flex items-center justify-start hover:bg-slate-100 hover:shadow-sm py-4 cursor-pointer transition delay-50 mb-1">
                                                <span className="flex items-center">
                                                    {
                                                        item.path === pathname ? <span className={`${!open && "hidden"}`}>
                                                            <ActiveIcon />
                                                        </span> : <span className={`${!open && "hidden"}`}>
                                                            <ActiveIcon fill={'#fff'} />
                                                        </span>
                                                    }
                                                    <span className={`${!open && "hidden"} ml-6`}>
                                                        {item.icon === 'HomeIcon' && <HomeIcon width={25} fill={item.path === pathname ? 'var(--primary)' : 'var(--secondary-two)'} />}
                                                        {item.icon === 'ArticleIcon' && <ArticleIcon width={20} fill={item.path === pathname ? 'var(--primary)' : 'var(--secondary-two)'} />}
                                                        {item.icon === 'SectionIcon' && <SectionIcon width={25} fill={item.path === pathname ? 'var(--primary)' : 'var(--secondary-two)'} />}
                                                        {item.icon === 'CategoryIcon' && <CategoryIcon width={25} fill={item.path === pathname ? 'var(--primary)' : 'var(--secondary-two)'} />}
                                                        {item.icon === 'UsersIcon' && <UserIcon width={25} fill={item.path === pathname ? 'var(--primary)' : 'var(--secondary-two)'} />}
                                                        {item.icon === 'SettingsIcon' && <SettingIcon width={25} fill={item.path === pathname ? 'var(--primary)' : 'var(--secondary-two)'} />}
                                                    </span>
                                                </span>
                                                <span className={`${!open && "hidden"} ${item.path === pathname ? 'primary-color' : 'secondary-two-color'} text-base font-semibold ml-11 pt-0.5`}>{item.name}</span>
                                            </li>
                                        </Link>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <label htmlFor="my-modal-3" onClick={() => handleLogout()} className="absolute bottom-0 w-full">
                        <span className="flex items-center justify-start hover:bg-slate-100 hover:shadow-sm py-4 cursor-pointer transition delay-50 mb-4">
                            <span className="flex items-center cursor-pointer">
                                <span className={`${!open && "hidden"} ml-8`}>
                                    <LogoutIcon width={25} fill="var(--secondary-two)" />
                                </span>
                            </span>
                            <span className={`${!open && "hidden"} secondary-two-color hover:primary-color text-base font-semibold ml-11 pt-0.5 cursor-pointer`}>Logout</span>
                        </span>
                    </label>
                </div>
                {/* sidebar End */}

                <div className={`grid grid-cols-4 w-full ${open ? "ml-72" : "ml-0"} duration-300`}>
                    <div className={`h-screen flex-1 pl-6 pr-6 pt-5 ${hideRightBar ? 'col-span-4 lg:col-span-4' : 'col-span-3 lg:col-span-3'} w-full`}>
                        <div className="flex items-center">
                            <div className="mr-5">
                                <img
                                    src={MenuIcon}
                                    className={`cursor-pointer  ${!open && "rotate-180"} w-6`}
                                    onClick={() => setOpen(!open)}
                                />
                            </div>
                            <img
                                className="w-12 h-12 object-cover rounded-full cursor-pointer z-10 bg-quill-grey"
                                src={user.profile_image ? user.profile_image : '/default.png'}
                                alt="avatar"
                            />
                            <div className="bg-quill-grey bg-opacity-70 -ml-4 py-1 rounded-r-full cursor-pointer">
                                <span className="pl-6 pr-3">{user.name}</span>
                            </div>
                        </div>
                        <div className="mt-8">
                            {children}
                        </div>
                    </div>
                    {
                        !hideRightBar && <div className="w-full hidden lg:inline">
                            <div className="fixed bg-white h-screen shadow-2xl rounded-l-3xl w-full">
                                <div className="p-5 w-full">
                                    <h1 className="font-bold text-lg opacity-60">New Article</h1>
                                    <div className="mt-5">
                                        <NewArticle open={open} />
                                    </div>
                                </div>
                                <div className="p-5">
                                    <h1 className="font-bold text-lg opacity-60">New Users</h1>
                                    <div className="mt-5">
                                        <NewUsers />
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                </div>
            </div>
        </>
    );
    return design;
};
export default Layout;