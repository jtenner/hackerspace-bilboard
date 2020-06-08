import * as React from "react";
import ReactDOM from "react-dom";
import { AppState } from "./AppState";
import moment from "moment";
import fetchJSONP from "fetch-jsonp";
import { Slide } from "./Slide";
import { getEventURL, staticSlidesURL } from "./getEventURL";
import { EventItem } from "./EventItem";

/**
 * This is the root React component that represents the app itself.
 */
class App extends React.Component<{}, AppState> {
  /**
   * This constructor accepts any props because they aren't used.
   * @param {any} props
   */
  constructor(props: {}) {
    super(props);

    // The state contains an array of data and a current index
    this.state = {
      data: [],
      index: 0,
    };

    /**
     * Every 45 seconds, update the current index by increasing the index by 1, or by moving to the
     * first item.
     */
    setInterval(() => {
      const index = (this.state.index === this.state.data.length - 1) ? 0 : this.state.index + 1;
      this.setState({ index });
    }, 45 * 1000);
  }

  /**
   * If the component will mount, start the updateData() cycle.
   */
  componentWillMount() {
    this.updateData();
  }

  /**
   * This function renders two slides, denoted by a key provided by the slides api. When the index
   * updates, it should do the following things:
   *
   * - remove the previous slide from the dom
   * - append the next slide to the front of the deck
   * - fade out the current slide
   * - fade in the next slide
   */
  render() {
    if (this.state.data.length === 0) return "Loading!";
    const currentIndex = this.state.index;
    const current = this.state.data[currentIndex];
    const previousIndex = currentIndex === 0 ? this.state.data.length - 1 : currentIndex - 1;
    const previous = this.state.data[previousIndex];

    /**
     * The deck can only have two slides at a time. The key property tells react to keep track of
     * which event belongs on which slide.
     */
    return <div className="deck">
      <Slide key={previousIndex} record={previous} fadeIn={false}/>
      <Slide key={currentIndex} record={current} fadeIn />
    </div>
  }

  /**
   * This function sets up a setInterval loop for data refresh.
   */
  async updateData(): Promise<void> {
    try {
      const url = getEventURL();
      const today = moment();

      // use jsonp with the meetup api

      const [
        meetup,
        ...staticData
      ] = await Promise.all([
        fetchJSONP(url).then(e => e.json()),
        ...staticSlidesURL.map(
          e => fetch(e).then(f => f.json())
        )
      ]);

      const meetupEvents = meetup.data
        .filter(e => e.visibility === "public")
        // todo: verify this is correct
        .filter(e => moment(e.local_date).isAfter(today));

      const data: EventItem[]  = [];
      const length = Math.max(meetupEvents.length, ...staticData.map(e => e.length));

      for (let i = 0; i < length; i++) {
        if (i < meetupEvents.length) data.push(meetupEvents[i]);
        for (let j = 0; j < staticData.length; j++) {
          const staticDataElement = staticData[i];
          if (i < staticDataElement.length) data.push(staticDataElement[i]);
        }
      }

      this.setState({
        // the goal of this expression is to filter the events that are public and are in the future
        data,
        index: 0,
      });
    } catch (ex) {
      console.log(ex);
    }

    // run the updateData function every hour in case the data changes
    setTimeout(this.updateData.bind(this), 60 * 60 * 1000);
  }
}

/**
 * Required by react to hook up the App.
 */
ReactDOM.render(
  <App />,
  document.querySelector(".body-start"),
);
