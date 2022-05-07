import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {app} from "@config/firebase.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from "@firebase/storage";
import { v4 } from "uuid";

// components
import Wrapper from "@components/wrapper/wrapper";
import DefaultInput from "@components/input/input";
import DefaultTextArea from "@components/textarea/textarea";
import SelectBox from "@components/select/select";
import Loader from "@components/spinner/loader.jsx";

// assets
import user from "@images/user.png";

// actions
import { updateProfile } from "@actions/profile.action";

// avatar = models.ImageField(upload_to='avatar', null=True, blank=True)

const initialState = {
  avatar: "",
  technology: "",
  linkedIn: "",
  github: "",
  bio: "",
  portfolio: "",
  path: "",
  country: "",
};

const Profile = () => {
  const userInfo = useSelector((state) => state?.AuthReducer?.user);
  const [formData, setFormData] = useState({ ...initialState });
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState({});

  const storage = getStorage(app);

  const dispatchEvent = useDispatch();

  useEffect(() => {
    const parseData = {
      technology: userInfo?.technology ?? "",
      linkedIn: userInfo?.linkedIn ?? "",
      github: userInfo?.github ?? "",
      bio: userInfo?.bio ?? "",
      portfolio: userInfo?.portfolio ?? "",
      country: userInfo?.country ?? "",
      avatar: "",
      path: userInfo?.path ?? "",
    };
    setFormData({ ...parseData });
  }, []);

  const getAllInputValue = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const uploadImageHandler = async () => {
    try {
      const imageRef = ref(storage, `avatar/${v4()}.jpg`);
      const response = await uploadBytes(imageRef, formData?.avatar);
      const avatar = await getDownloadURL(ref(storage, response?.metadata?.fullPath));
      return {avatar, path: response?.metadata?.fullPath};
    } catch (err) {
      throw new Error(err);
    }
  };

  const deletePrevisousImage = async () => {
    try {
      const deleteObjectRef = ref(storage, formData?.path);
      const response = await deleteObject(deleteObjectRef);
      return response;
    } catch(err) {
      return Promise.resolve(err)
    }
  }

  const submitHandler = async (e) => {
    try {
      if (!formData?.avatar) {
        delete formData.avatar;
        delete formData?.path;
        setIsLoading(true);
        await dispatchEvent(updateProfile(formData));
      } else {
        setIsUploading(true)
        await deletePrevisousImage();
        const {avatar, path} = await uploadImageHandler();
        setIsUploading(false)
        setIsLoading(true);
        await dispatchEvent(updateProfile({...formData, avatar, path}));
      }
      toast.success("Profile Updated", {
        theme: "colored",
      });
    } catch (err) {
      toast.error(err?.message ?? "Something Error Occured", {
        theme: "colored",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const imageUploadHandler = (e) => {
    setFormData({ ...formData, avatar: e.target.files[0] });
  };

  const showImageHandler = () => {
    if (!formData?.avatar && !userInfo?.avatar) {
      return user;
    } else if (formData?.avatar) {
      return URL.createObjectURL(formData?.avatar);
    } else if (userInfo?.avatar) {
      return userInfo?.avatar;
    }
  };

  return (
    <Wrapper>
      {isLoading && <Loader />}
      <div className='my-6'>
        <h1 className='text-3xl pb-6 text-sideBarText'>Profile</h1>
        <hr />
      </div>
      <div className='xl:w-1/4 sm:w-3/4 w-full min-w-40 flex flex-col gap-y-2.5'>
        <input
          className='hidden'
          id='profilepic'
          type='file'
          accepts='.jpg, .png, .jpeg'
          alt='preview'
          onChange={imageUploadHandler}
        />
        <label htmlFor='profilepic'>
          <img
            src={showImageHandler()}
            alt='avatar'
            className='w-32 aspect-square object-center object-cover rounded-full hover:brightness-75 duration-100 cursor-pointer'
          />
        </label>
        <DefaultInput
          name='Username'
          labelText='Username'
          placeholder='Username'
          type='text'
          value={userInfo?.user?.username}
          extraText='Username Cannot be Changed'
          readOnly={true}
        />
        <SelectBox
          name='Role'
          value={userInfo?.signedAs}
          labelText='Role'
          disabled={true}
        >
          <option className='text-sideBarText'>{userInfo?.signedAs}</option>
        </SelectBox>
        <DefaultInput
          name='technology'
          labelText='Skill'
          placeholder='Technology Name'
          type='text'
          onChange={getAllInputValue}
          value={formData?.technology}
          extraText='Eg: ReacJS, NodeJS, MongoDB'
        />
        <DefaultInput
          name='linkedIn'
          labelText='LinkedIn Profile'
          placeholder='Link https://...'
          type='text'
          onChange={getAllInputValue}
          value={formData?.linkedIn}
          extraText='Linkedin Profile URL'
        />
        <DefaultInput
          name='github'
          labelText='Github Profile'
          placeholder='Link https://...'
          type='text'
          onChange={getAllInputValue}
          value={formData?.github}
          extraText='Github Profile URL'
        />
        <DefaultInput
          name='portfolio'
          labelText='Portfolio Link'
          placeholder='Link https://...'
          type='text'
          onChange={getAllInputValue}
          value={formData?.portfolio}
        />
        <DefaultTextArea
          name='bio'
          labelText='Bio Info'
          placeholder='Write About Yourself'
          type='text'
          value={formData?.bio}
          onChange={getAllInputValue}
          extraText='Maximum 200 Characters'
        />
        <div>
          <Button
            color={`${isUploading ? "gray" : "lightBlue"}`}
            buttonType={`${isUploading ? "outline" : "filled"}`}
            className={`${isUploading && "pointer-events-none"}`}
            size='regular'
            rounded={false}
            block={false}
            iconOnly={false}
            ripple='light'
            onClick={!isUploading ? submitHandler : null}
          >
            {!isUploading ? 'Save Changes' : 'Uploading Image...'}
          </Button>
        </div>
      </div>
    </Wrapper>
  );
};

export default Profile;
