import moment from "moment";
export const formatTime = (createdAt: string) => {
  const now = moment();
  const created = moment(createdAt);

  // if the task is created today
  if (created.isSame(now, "day")) {
    return "Today";
  }

  // if the task was craeted yesterday
  if (created.isSame(now.subtract(1, "days"), "day")) {
    return "Yesterday";
  }

  // check if the task was created in the last 7 days
  if (created.isAfter(moment().subtract(6, "days"))) {
    return created.fromNow();
  }

  if (created.isAfter(moment().subtract(3, "weeks"), "week")) {
    return created.fromNow();
  }

  return created.format("DD/MM/YYYY");
};
