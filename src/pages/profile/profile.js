import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

// components
import Wrapper from "@components/wrapper/wrapper";
import DefaultInput from "@components/input/input";
import DefaultTextArea from "@components/textarea/textarea";
import SelectBox from "@components/select/select";
import Loader from "@components/spinner/loader.jsx";

// assets
import user from '@images/user.png';

// actions
import { updateProfile } from "@actions/profile.action";

// avatar = models.ImageField(upload_to='avatar', null=True, blank=True)

const initialState = {
  avatar: "https://www.google.com",
  technology: "",
  linkedIn: "",
  github: "",
  bio: "",
  portfolio: "",
  country: "",
};

const Profile = () => {
  const userInfo = useSelector((state) => state?.AuthReducer?.user);
  const [formData, setFormData] = useState({ ...initialState });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});

  const dispatchEvent = useDispatch();

  useEffect(() => {
    const parseData = {
      technology: userInfo?.technology ?? "",
      linkedIn: userInfo?.linkedIn ?? "",
      github: userInfo?.github ?? "",
      bio: userInfo?.bio ?? "",
      portfolio: userInfo?.portfolio ?? "",
      country: userInfo?.country ?? "",
      avatar: userInfo?.avatar ?? "",
    };
    setFormData({ ...parseData });
  }, []);

  const getAllInputValue = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    setIsLoading(true);
    try {
      await dispatchEvent(updateProfile(formData));
      toast.success("Profile Updated", {
        theme: "colored",
      });
    } catch (err) {
      toast.success(err?.message ?? "Something Error Occured", {
        theme: "colored",
      });
    } finally {
      setIsLoading(false);
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
          <div>
              <img src={user} alt='avatar' className='w-32' />
          </div>
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
            color='lightBlue'
            buttonType='filled'
            size='regular'
            rounded={false}
            block={false}
            iconOnly={false}
            ripple='light'
            onClick={submitHandler}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </Wrapper>
  );
};

export default Profile;
