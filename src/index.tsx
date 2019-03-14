import * as React from "react";
import ReactDOM from "react-dom";
import { EventItem } from "./EventItem";
import { AppState } from "./AppState";
import moment from "moment";

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
      <h1 className="slide-title">Event: {this.props.record.name}</h1>
      <div className="slide-date">Time: {this.props.record.local_date} {this.props.record.local_time}</div>
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
    return <div>
      <Slide key={previousIndex} record={previous} fadeIn={false}/>
      <Slide key={currentIndex} record={current} fadeIn />
    </div>
  }
  async updateData(): Promise<void> {
    const url = eventUrl + encodeURIComponent(moment().add(2, "months").format("YYYY-MM-DDThh:mm:ss"))

    console.log(url);
    const resp = await fetch(
      url,
      {
        mode: "no-cors",
      },
    );
    const text = await resp.text();
    const replaced = text.replace(
      /src="([^"]*)"/g,
      "src=\\\"$1\\\"",
    );
    console.log(replaced);
    const json: EventItem[] = JSON.parse(replaced);

    this.setState({
      data: json
        .filter(e => e.visibility === "public"),
      index: 0,
    });
  }
}

ReactDOM.render(
  <App />,
  document.querySelector(".body-start"),
);
