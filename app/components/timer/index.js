import React from 'react';
import moment from 'moment';
import padStart from 'lodash/padStart';

import './style.scss';


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
    const endDateTime = moment(this.props.endDate);
    this.setState({
      timeLeft: moment(moment(endDateTime).diff(moment())),//moment().subtract(endDateTime),
      nextTime: moment(moment(endDateTime).diff(moment())).subtract(1,'seconds'),
    }, () => {
      console.log(this.state.timeLeft, this.state.nextTime);
    });
    this.startTimer();
  }

  startTimer() {
    setInterval(() => {
      this.setState({
        secondClassList: 'to-animate animate',
        minuteClassList: this.state.minutes === this.state.nextMinutes ? '' : 'to-animate animate',
        hourClassList: this.state.hours === this.state.nextHours ? '' : 'to-animate animate',
        daysClassList: this.state.days === this.state.nextDays ? '' : 'to-animate animate',
      });
      setTimeout(() => {
        this.setState({
          nextTime: this.state.nextTime.subtract(1, 'seconds'),
          timeLeft: this.state.timeLeft.subtract(1, 'seconds'),
          secondClassList: '',
          minuteClassList: '',
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
      <li className={`timer-unit ${this.state.daysClassList}`}><div>{padStart(this.state.nextDays, 2, 0)}</div><div>{padStart(this.state.days,2, 0)}</div></li>
      <li className='time-sepertor'> d :</li>
      <li className={`timer-unit ${this.state.hourClassList}`}><div>{padStart(this.state.nextHours, 2, 0)}</div><div>{padStart(this.state.hours,2, 0)}</div></li>
      <li className='time-sepertor'>hh :</li>
      <li className={`timer-unit ${this.state.minuteClassList}`}><div>{padStart(this.state.nextMinutes,2, 0)}</div><div>{padStart(this.state.minutes,2, 0)}</div></li>
      <li className='time-sepertor'> mm :</li>
      <li className={`timer-unit ${this.state.secondClassList}`}><div>{padStart(this.state.nextSecond, 2, 0)}</div><div>{padStart(this.state.seconds,2, 0)}</div></li>
      <li className='time-sepertor'> ss</li>
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
