
import dayjs from "dayjs";
export const formatDate = (date, format = "DD/MM/YYYY") => {
  return dayjs(date).format(format);
};