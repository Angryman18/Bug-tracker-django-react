import format from "date-fns/format";

const useDateFormat = () => {
  const formatDate = (date, formatText='do MMM, yyyy') => {
    return format(new Date(date), formatText);
  };

  return {
    formatDate,
  };
};
export default useDateFormat;
