import React from 'react';
import moment from 'moment';

import './style.scss';

const endDateTime = moment().add(7, 'days');

export default class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      days: '--',
      hours: '--',
      minutes: '--',
      seconds: '--',
      classList: 'timer-unit',
      timeLeft: '',
      nextTime: '',
    };
  }

  componentDidMount() {
    this.setState({
      timeLeft: moment().subtract(endDateTime),
      nextTime: moment().subtract(endDateTime).subtract(1,'seconds'),
    });
    this.startTimer();
  }

  startTimer() {
    setInterval(() => {
      this.setState({
        classList: 'timer-unit to-animate animate'
      });
      setTimeout(() => {
        this.setState({
          nextTime: this.state.nextTime.subtract(1, 'seconds'),
          timeLeft: this.state.timeLeft.subtract(1, 'seconds'),
          classList: 'timer-unit',
          days: this.state.timeLeft.days(),
          nextDays: this.state.nextTime.days(),
          hours: this.state.timeLeft.hours(),
          nextHours: this.state.nextTime.hours(),
          minutes: this.state.timeLeft.minutes(),
          nextMinutes: this.state.nextTime.minutes(),
          seconds: this.state.timeLeft.seconds(),
          nextSecond: this.state.nextTime.seconds(),
        });
      }, 500);
    },1000)
  }

  getCountdown() {
    return <ul className='timer'>
      <li className="timer-unit">{this.state.days}</li>
      <li className="timer-unit">{this.state.hours}</li>
      <li className="timer-unit">{this.state.minutes}</li>
      <li className={this.state.classList}><div>{this.state.nextSecond}</div><div>{this.state.seconds}</div></li>
      <li className={this.state.classList}><div>{this.state.nextSecond}</div><div>{this.state.seconds}</div></li>
      <li className={this.state.classList}><div>{this.state.nextSecond}</div><div>{this.state.seconds}</div></li>
      <li className={this.state.classList}><div>{this.state.nextSecond}</div><div>{this.state.seconds}</div></li>
    </ul>
  }

  render() {
    return(
      <span>
        {this.getCountdown()}
      </span>
    )
  }
}
