// verndors
import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { format } from "date-fns";

// components
import DefaultTextArea from "@components/textarea/textarea";

// service
import projectService from "@service/project.service";

// actions
import { getAllComment } from "@actions/project.action";

// assets
import image from "@images/user.png";

const Comments = (props) => {
  const dispatch = useDispatch();
  const prjectComment = useSelector((state) => state?.ProjectReducer?.comment);
  const { project } = props;

  const [comment, setComment] = useState({
    comment: "",
    error: false,
  });

  const [loading, setLoading] = useState(false);
  const getComments = (e) => {
    setComment({ error: false, comment: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (comment?.comment.length) {
      const Obj = {
        comment: comment?.comment,
        projectId: project,
      };
      setLoading(true);
      projectService
        .addComment(Obj)
        .then(async (res) => {
          toast.success(res?.message ?? "Comment is Added");
          setComment({ comment: "", error: false });
          await dispatch(getAllComment(project));
        })
        .catch((err) => {
          return toast.error(err.message ?? "Comment Cannot be Added");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setComment({ ...comment, error: true });
    }
  };

  useEffect(() => {
    (async () => {
      await dispatch(getAllComment(project));
    })();
  }, []);

  return (
    <div>
      <div className='flex flex-row gap-x-4'>
        <img
          src={image}
          className='mt-4 w-16 border-2 border-lightSlate h-16 object-fill rounded-full'
          alt='profilepic'
        />
        <div className='w-160'>
          <DefaultTextArea
            placeholder='Write Comment'
            onChange={getComments}
            error={comment?.error}
            type='text'
            name='comments'
            value={comment?.comment}
            labelText='Write Your Comment'
          />
          <Button
            color={loading ? "gray" : "lightBlue"}
            className={
              loading
                ? "pointer-events-none cursor-not-allowed"
                : "float-right my-3"
            }
            buttonType={loading ? "outline" : "filled"}
            size='regular'
            rounded={false}
            block={false}
            iconOnly={false}
            ripple='light'
            onClick={submitHandler}
            disabled={loading}
          >
            Add Comment
          </Button>
        </div>
      </div>

      {prjectComment?.map((comment, index) => (
        <div key={comment?.comment} className='w-160 mb-6'>
          <div className='flex flex-row gap-x-4'>
            <img
              className="className='mt-4 w-16 border-2 border-lightSlate h-16 object-fill rounded-full"
              src={image}
              alt='profilePic'
            />
            <div className='flex flex-col'>
              <p>
                <span className='text-sideBarText font-bold'>
                  {comment?.user?.user?.username}
                </span>
                <span className='text-sm mx-2 italic text-disbaledText'>
                  ({comment?.user?.signedAs})
                </span>
              </p>
              <p className='text-sideBarText text-sm'>
                {format(new Date(comment?.commentDate), "do MMM yyyy, h:m a")}
              </p>
              <p className='text-sideBarText'>{comment.comment}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
