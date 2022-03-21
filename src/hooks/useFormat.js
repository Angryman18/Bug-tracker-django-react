import format from "date-fns/format";

const useDateFormat = () => {
  const formatDate = (date, formatText = "do MMM, yyyy") => {
    return format(new Date(date), formatText);
  };

  const formatText = (value) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  return {
    formatDate,
    formatText
  };
};
export default useDateFormat;
