const useGetImage = () => {
  const getImage = (avatar, defaultImage) => {
    if (!avatar || !avatar) return defaultImage;
    return avatar;
  };

  return [getImage];
};

export default useGetImage;
