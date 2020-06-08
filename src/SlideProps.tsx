export interface ISlideRecord {
  local_date: string;
  local_time: string;
  name: string;
  description: string;
}

/**
 * This interface contains the information about the props passed to the `Slide` component.
 *
 * - A record is a meetup event record
 * - The fadeIn property sets the `slide-fadein` class on the div element
 */
export interface SlideProps {
  record: ISlideRecord;
  fadeIn: boolean;
}
