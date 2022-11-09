import {
  DeleteIcon,
  EditIcon,
  VisibilityIcon,
} from "../../components/Icon/Icon";
import Layout from "../../components/Layout/Layout";
import {
  Button,
  Card,
  Form,
  Input,
  Modal,
  Text,
  TextInput,
} from "../../tailwind";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpen } from "../../redux/slice​/modalSlice";
import { useState, useEffect } from "react";
import { saveSetting } from "../../http";
import toast from "react-hot-toast";

const Settings = () => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.modal);
  const { data } = useSelector((state) => state.settings);
  const [logo, setLogo] = useState();
  const [logoFile, setLogoFile] = useState();
  const [appLogoFile, setAppLogoFile] = useState();
  const [faviconFile, setFaviconFile] = useState();
  const [Favicon, setFavicon] = useState();
  const [appLogo, setAppLogo] = useState();
  const [loading, setLoading] = useState(false);
  // Capture Logo function
  function captureLogo(e) {
    const file = e.target.files[0];
    setLogoFile(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setLogo(reader.result);
    };
  }
  // Capture App Logo function
  function captureAppLogo(e) {
    const file = e.target.files[0];
    setAppLogoFile(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setAppLogo(reader.result);
    };
  }

  // Capture Favicon function
  function captureFavicon(e) {
    const file = e.target.files[0];
    setFaviconFile(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setFavicon(reader.result);
    };
  }

  useEffect(() => {
    setLogo(data.web_logo);
    setAppLogo(data.app_logo);
    setFavicon(data.favicon);
    setSettingsData(data);
  }, [data.web_logo]);

  const [settingsData, setSettingsData] = useState({
    title: "",
    admin_title: "",
    description: data.description,
    keywords: data.keywords,
    favicon: data.favicon,
    web_logo: data.web_logo,
    app_logo: data.app_logo,
    site_copyright: data.site_copyright,
    site_email: data.site_email,
    google_analytics: data.google_analytics,
  });

  // Save Settings
  const saveSettings = async () => {
    const formData = new FormData();
    formData.append("title", settingsData.title);
    formData.append("admin_title", settingsData.admin_title);
    formData.append("description", settingsData.description);
    formData.append("keywords", settingsData.keywords);
    if (logoFile) {
      formData.append("web_logo", logoFile);
    }
    if (appLogoFile) {
      formData.append("app_logo", appLogoFile);
    }
    if (faviconFile) {
      formData.append("favicon", faviconFile);
    }
    formData.append("site_copyright", settingsData.site_copyright);
    formData.append("site_email", settingsData.site_email);
    formData.append("google_analytics", settingsData.google_analytics);

    try {
      setLoading(true);
      const response = await saveSetting(formData);
      if (response.status === 200) {
        setLoading(false);
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Something went wrong");
    }
  };
  return (
    <>
      {isOpen ? <Modal /> : null}
      <div className="flex justify-center w-auto">
        <div className="2xl:container w-full flex">
          <Layout>
            <Text title={"Settings"} />
            <Form>
              <div className="mt-5 grid grid-cols-5 gap-10 w-full">
                <div className="flex col-span-3">
                  <div className="w-screen">
                    <TextInput
                      placeholder="Website Name"
                      value={settingsData.title}
                      onChange={(e) =>
                        setSettingsData({
                          ...settingsData,
                          title: e.target.value,
                        })
                      }
                    />

                    <Input
                      name="web_logo"
                      type="text"
                      placeholder="Admin Title"
                      marginVertical="my-4"
                      value={settingsData.admin_title}
                      onChange={(e) =>
                        setSettingsData({
                          ...settingsData,
                          admin_title: e.target.value,
                        })
                      }
                    />

                    <Input
                      name="copy_right"
                      type="text"
                      placeholder="Copy Right"
                      marginVertical="my-4"
                      value={settingsData.site_copyright}
                      onChange={(e) =>
                        setSettingsData({
                          ...settingsData,
                          site_copyright: e.target.value,
                        })
                      }
                    />

                    <TextInput
                      inputType="textarea"
                      marginVertical="my-5"
                      cols="30"
                      rows="10"
                      placeholder="Website Description"
                      defaultValue={settingsData.description}
                      onChange={(e) =>
                        setSettingsData({
                          ...settingsData,
                          description: e.target.value,
                        })
                      }
                    />

                    <TextInput
                      inputType="textarea"
                      marginVertical="my-5"
                      cols="30"
                      rows="4"
                      placeholder="Website Keywords"
                      defaultValue={settingsData.keywords}
                      onChange={(e) =>
                        setSettingsData({
                          ...settingsData,
                          keywords: e.target.value,
                        })
                      }
                    />

                    <Input
                      name="site_email"
                      type="text"
                      placeholder="Site Email"
                      marginVertical="my-4"
                      value={settingsData.site_email}
                      onChange={(e) =>
                        setSettingsData({
                          ...settingsData,
                          site_email: e.target.value,
                        })
                      }
                    />

                    <Input
                      name="google_analytics"
                      type="text"
                      placeholder="Google Analytics ID"
                      marginVertical="my-4"
                      value={settingsData.google_analytics}
                      onChange={(e) =>
                        setSettingsData({
                          ...settingsData,
                          google_analytics: e.target.value,
                        })
                      }
                    />

                    <Button
                      onClick={saveSettings}
                      height="h-16"
                      title={"Save"}
                      loading={loading}
                    />
                  </div>
                </div>
                <div className="col-span-2">
                  <Card title={"Website Logo"}>
                    <div className="flex items-center justify-center">
                      <input
                        onChange={captureLogo}
                        accept="image/*"
                        id="logo"
                        type="file"
                        name="logo"
                        className="hidden"
                      />
                      <label htmlFor="logo">
                        <img
                          className="cursor-pointer my-10 w-56 h-16 object-cover"
                          src={logo}
                          alt="logo"
                        />
                      </label>
                    </div>
                  </Card>
                  <div className="mt-5">
                    <Card title={"App Logo"}>
                      <div className="flex items-center justify-center">
                        <input
                          onChange={captureAppLogo}
                          accept="image/*"
                          id="Applogo"
                          type="file"
                          name="Applogo"
                          className="hidden"
                        />
                        <label htmlFor="Applogo">
                          <img
                            className="cursor-pointer my-10 w-56 h-16 object-cover"
                            src={appLogo}
                            alt="Applogo"
                          />
                        </label>
                      </div>
                    </Card>
                  </div>

                  <div className="mt-5">
                    <Card title={"Favicon"}>
                      <div className="flex items-center justify-center">
                        <input
                          onChange={captureFavicon}
                          accept="image/*"
                          id="Favicon"
                          type="file"
                          name="Favicon"
                          className="hidden"
                        />
                        <label htmlFor="Favicon">
                          <img
                            className="cursor-pointer my-10 w-32 h-32 object-cover"
                            src={Favicon}
                            alt="Favicon"
                          />
                        </label>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </Form>
            <div>
              <Text title={"Ads"} />
              <div className="mt-5 grid grid-cols-4 gap-10 w-full">
                <div className="flex col-span-2">
                  <div className="w-screen">
                    <TextInput inputType="textarea" placeholder="Ads Code" />
                    <TextInput
                      inputType="textarea"
                      placeholder="Ads Code"
                      marginVertical="my-5"
                    />
                  </div>
                </div>
                <div className="col-span-2">
                  <TextInput inputType="textarea" placeholder="Ads Code" />
                  <TextInput
                    inputType="textarea"
                    placeholder="Ads Code"
                    marginVertical="my-5"
                  />
                </div>
              </div>
            </div>
          </Layout>
        </div>
      </div>
    </>
  );
};

export default Settings;
