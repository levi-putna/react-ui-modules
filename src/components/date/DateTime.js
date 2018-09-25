import React, {Component} from "react";
import PropTypes from 'prop-types';
import moment from 'moment';

export default class DateTime extends Component {

  static propTypes = {
    date: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),

    toFormat: PropTypes.string,
    fromFormat: PropTypes.string,
  };

  static defaultProps = {
    toFormat: 'MMMM Do YYYY, h:mm:ss a',
    fromFormat: null,
  };

  render() {
    const {date, toFormat, fromFormat, className} = this.props;
    const momentDate = (date) ? moment(date, fromFormat) : moment();

    const formattedDate = momentDate.format(toFormat);
    const dateTime = momentDate.format();

    return (
      <time datetime={dateTime} className={className}>{formattedDate}</time>
    );
  }
}
