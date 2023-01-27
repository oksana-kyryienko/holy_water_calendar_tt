import React, { useRef, useState } from 'react';
import './Calendar.css';
import * as calendar from './calendar';
import classnames from 'classnames';

interface CalendarM {
  years: [],
  monthNames: [],
  weekDayNames: [],
  date: Date;
}

type Props = {
  years?: Array<number>,
  monthNames?: Array<string>,
  weekDayNames?: Array<string>,
  date: Date,
  monthData?: Array<Date>
}

export default class CalendarClass extends React.Component<Props> {
  static defaultProps = {
    years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023],
    monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    weekDayNames: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    date: new Date(),
    onChange: Function.prototype,
  };

  state = {
    date: this.props.date,
    currentDate: new Date(),
    selectedDate: null,
  };
  yearSelect?: any;
  monthSelect?: any;

  get year() {
    return this.state.date.getFullYear();
  }

  get month() {
    return this.state.date.getMonth();
  }

  get day() {
    return this.state.date.getDate();
  }

  handlePrevMonthButtonClick = () => {
    const date = new Date(this.year, this.month - 1);
    console.log(date);
    this.setState({ date });
  };
  
  handleNextMonthButtonClick = () => {
    const date = new Date(this.state.date.getFullYear(), this.state.date.getMonth() + 1);
    this.setState({ date });
  };

  handleDayClick = (date: any) => {
    this.setState({selectedDate: date});
  };

  handleSelectChange = () => {
    const year = this.yearSelect.value;
    const month = this.monthSelect.value;
    const date = new Date(year, month);
    console.log(date);
    this.setState({ date });
  };
  
  
  render() {
    const { years = [], monthNames = [], weekDayNames = [] } = this.props;
    const monthData = calendar.getMonthData(this.year, this.month);
    const { currentDate, selectedDate} = this.state;
    return (
      <div className="calendar">
        <header>
          <button 
            type="button"
            onClick={this.handlePrevMonthButtonClick}
          >
            {'<'}
          </button>
          <select
            onChange={this.handleSelectChange}
            ref={el => this.monthSelect = el}
            value={this.month}
          >
            {monthNames.map((name, index) =>
              <option key={name} value={index}>{name}</option>
            )}
          </select>
          <select
            onChange={this.handleSelectChange} 
            ref={el => this.yearSelect = el}
            value={this.year}
          >
            {years.map(year => 
              <option key={year} value={year}>{year}</option>
            )}
          </select>
          <button 
            type="button"
            onClick={this.handleNextMonthButtonClick}
          >
            {'>'}
          </button>
        </header>
        <table>
          <thead>
            <tr>
              {weekDayNames.map(name =>
                <th key={name}>{name}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {monthData.map((week: any[], index: React.Key | null | undefined) => 
              <tr key={index} className='week'>
                {week.map((date, index) => 
                  date 
                    ? <td 
                      className={classnames('day', {
                        'today': calendar.areEqual(date, currentDate),
                        'selected': calendar.areEqual(date, selectedDate)
                      })}
                      key={index}
                      onClick={() => this.handleDayClick(date)}
                    >
                      {date.getDate()}
                    </td>
                    : <td key={index} />
                )}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
