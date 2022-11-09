import {
    MenuIcon,
    HomeIcon,
    ActiveIcon,
    ArticleIcon,
    SectionIcon,
    CategoryIcon,
    UserIcon,
    SettingIcon,
    LogoutIcon
} from "../Icon/Icon";

const SideBar = () => {
    return (
        <div className="w-80 bg-white h-screen drop-shadow-2xl relative">
            <div className="flex px-5 py-5 justify-between ">
                <div className="cursor-pointer -mt-0.5 ml-3">
                    <MenuIcon />
                </div>
                <div className="w-32 mr-1">
                    <img
                        src="https://res.cloudinary.com/dm4uaqlio/image/upload/v1648120282/logo_lndf2i.png"
                        alt="logo"
                    />
                </div>
            </div>

            {/* menu */}

            <div className="mt-16">
                <ul>
                    <li className="flex items-center justify-start hover:bg-slate-100 hover:shadow-sm py-4 cursor-pointer transition delay-50 mb-4">
                        <span className="flex items-center">
                            <ActiveIcon />
                            <span className="ml-6">
                                <HomeIcon fill="var(--primary)" />
                            </span>
                        </span>
                        <a href="#" className="primary-color text-xl font-semibold ml-16 pt-0.5">Home</a>
                    </li>

                    <li className="flex items-center justify-start hover:bg-slate-100 hover:shadow-sm py-4 cursor-pointer transition delay-50 mb-4">
                        <span className="flex items-center">
                            <span className="ml-7">
                                <ArticleIcon fill="var(--secondary-two)" />
                            </span>
                        </span>
                        <a href="#" className="secondary-two-color text-xl font-semibold ml-16 pt-0.5">Article</a>
                    </li>

                    <li className="flex items-center justify-start hover:bg-slate-100 hover:shadow-sm py-4 cursor-pointer transition delay-50 mb-4">
                        <span className="flex items-center">
                            <span className="ml-7">
                                <SectionIcon fill="var(--secondary-two)" />
                            </span>
                        </span>
                        <a href="#" className="secondary-two-color text-xl font-semibold ml-16 pt-0.5">Section</a>
                    </li>
                    <li className="flex items-center justify-start hover:bg-slate-100 hover:shadow-sm py-4 cursor-pointer transition delay-50 mb-4">
                        <span className="flex items-center">
                            <span className="ml-7">
                                <CategoryIcon fill="var(--secondary-two)" />
                            </span>
                        </span>
                        <a href="#" className="secondary-two-color text-xl font-semibold ml-16 pt-0.5">Category</a>
                    </li>
                    <li className="flex items-center justify-start hover:bg-slate-100 hover:shadow-sm py-4 cursor-pointer transition delay-50 mb-4">
                        <span className="flex items-center">
                            <span className="ml-7">
                                <UserIcon fill="var(--secondary-two)" />
                            </span>
                        </span>
                        <a href="#" className="secondary-two-color text-xl font-semibold ml-16 pt-0.5">Users</a>
                    </li>
                    <li className="flex items-center justify-start hover:bg-slate-100 hover:shadow-sm py-4 cursor-pointer transition delay-50 mb-4">
                        <span className="flex items-center">
                            <span className="ml-7">
                                <SettingIcon fill="var(--secondary-two)" />
                            </span>
                        </span>
                        <a href="#" className="secondary-two-color text-xl font-semibold ml-16 pt-0.5">Settings</a>
                    </li>
                </ul>
            </div>

            <div className="absolute bottom-0">
                <span className="flex items-center justify-start hover:bg-slate-100 hover:shadow-sm py-4 cursor-pointer transition delay-50 mb-4">
                    <span className="flex items-center">
                        <span className="ml-7">
                            <LogoutIcon fill="var(--secondary-two)" />
                        </span>
                    </span>
                    <a href="#" className="secondary-two-color text-xl font-semibold ml-16 pt-0.5">Logout</a>
                </span>
            </div>
        </div>

    );
}

export default SideBar;