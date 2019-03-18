import React from "react";
import moment from "moment";
import { SlideProps } from "./SlideProps";

export const friendlyFormat = "MMM Do YYYY, h:mm a";
export class Slide extends React.Component<SlideProps> {
  constructor(props) {
    super(props);
  }
  render() {
    const eventMoment = moment(`${this.props.record.local_date} ${this.props.record.local_time}`);
    return <div className={this.props.fadeIn ? "slide slide-fadein" : "slide slide-fadeout"}>
      <h1 className="slide-title">{this.props.record.name}</h1>
      <div className="slide-date">{eventMoment.format(friendlyFormat)}</div>
      <div className="slide-contents" dangerouslySetInnerHTML={{ __html: this.props.record.description }}></div>
    </div>;
  }
}
