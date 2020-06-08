import { EventItem } from "./EventItem";

/**
 * This interface contains the set of properties that exist on the `App` comoonent.
 */
export interface AppState {
  index: number;
  data: EventItem[];
}
