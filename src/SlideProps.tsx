import { EventItem } from "./EventItem";

/**
 * This interface contains the information about the props passed to the `Slide` component.
 *
 * - A record is a meetup event record
 * - The fadeIn property sets the `slide-fadein` class on the div element
 */
export interface SlideProps {
  record: EventItem;
  fadeIn: boolean;
}
