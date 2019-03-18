import moment from "moment";

export const eventURL = "http://api.meetup.com/CT-Hackerspace/events?no_later_than=";
export const eventURLDateFormat = "YYYY-MM-DDThh:mm:ss";

/**
 * This function is responsible for generating the url created to jsonp fetch the meetup api data.
 */
export function getEventURL(): string {
  const future = moment().add(2, "months");
  return eventURL + encodeURIComponent(future.format(eventURLDateFormat));
}
