/**
 * This interface was created by Joshua Tenner to inform TypeScript what the type of an EventItem
 * looks like.
 */
export interface EventItem {
  created: number;
  duration: number;
  id: string;
  name: string;
  date_in_series_pattern: boolean;
  status: string;
  time: number;
  local_date: string;
  local_time: string;
  updated: number;
  utc_offset: number;
  waitlist_count: number;
  yes_rsvp_count: number;
  venue: {
    id: number;
    name: string;
    lat: number;
    lon: number;
    repinned: true;
    address_1: string;
    address_2: string;
    city: string;
    country: string;
    localized_country_name: string;
    zip: string;
    state: string;
  };
  group: {
    created: number;
    name: string;
    id: number;
    join_mode: string;
    lat: number;
    lon: number;
    urlname: string;
    who: string;
    localized_location: string;
    state: string;
    country: string;
    region: string;
    timezone: string;
  };
  link: string;
  description: string;
  visibility: string;
}
