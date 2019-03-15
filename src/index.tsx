import * as React from "react";
import ReactDOM from "react-dom";
import { EventItem } from "./EventItem";
import { AppState } from "./AppState";
import moment from "moment";
import fetchJSONP from "fetch-jsonp";

const eventUrl = "http://api.meetup.com/CT-Hackerspace/events?no_later_than=";

interface SlideState {

}

interface SlideProps {
  record: EventItem;
  fadeIn: boolean;
}

class Slide extends React.Component<SlideProps, SlideState> {
  render() {
    return <div className={this.props.fadeIn ? "slide slide-fadein" : "slide slide-fadeout"}>
      <h1 className="slide-title">{this.props.record.name}</h1>
      <div className="slide-date">{moment(this.props.record.local_date + " " + this.props.record.local_time).format("MMM Do YYYY, h:mm a")}</div>
      <div className="slide-contents" dangerouslySetInnerHTML={{ __html: this.props.record.description }}></div>
    </div>;
  }
}

class App extends React.Component<{}, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      index: 0,
    };
    setInterval(() => {
      this.setState({
        index: (this.state.index === this.state.data.length - 1) ? 0 : this.state.index + 1,
      });
    }, 45 * 1000);
  }
  componentWillMount() {
    this.updateData();
  }
  render() {
    if (this.state.data.length === 0) return "Loading!";
    const currentIndex = this.state.index;
    const current = this.state.data[currentIndex];
    const previousIndex = currentIndex === 0 ? this.state.data.length - 1 : currentIndex - 1;
    const previous = this.state.data[previousIndex];
    return <div className="deck">
      <Slide key={previousIndex} record={previous} fadeIn={false}/>
      <Slide key={currentIndex} record={current} fadeIn />
    </div>
  }
  async updateData(): Promise<void> {
    const url = eventUrl + encodeURIComponent(moment().add(2, "months").format("YYYY-MM-DDThh:mm:ss"))

    console.log(url);
    const resp = await fetchJSONP(url);
    const json: any = await resp.json();
    const today = moment();
    this.setState({
      data: json.data
        .filter(e => e.visibility === "public")
        .filter(e => moment(e.local_date).isAfter(today)),
      index: 0,
    });
  }
}

ReactDOM.render(
  <App />,
  document.querySelector(".body-start"),
);
