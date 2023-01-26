import React, { useState } from 'react';
import './Calendar.css';

interface Calendar {
  years: [],
  monthNames: [],
  weekDayNames: [],
  date: Date;
  // onChange: (date: any) => void
}

type Props = {
  years?: Array<number>,
  monthNames?: Array<string>,
  weekDayNames?: Array<string>,
  date: Date,
  // onChange?: (date: any) => void
}

export const Calendar: React.FC<Props> = ({
  years = [],
  monthNames = [],
  weekDayNames = [],
  date,
  // onChange
}) => {

  const [d, setD] = useState(date);
  console.log(d);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentDate, setCurrentDate] = useState(date);

  const handlePrevMonthButtonClick = () => {
    const date = new Date(d.getFullYear(), d.getMonth() - 1);
    setD(date);
  };

  const handleNextMonthButtonClick = () => {
    const date = new Date(d.getFullYear(), d.getMonth() + 1);
    setD(date);
  };

  const handleSelectChange = () => {
    // const date = new Date(year, month);
    // setD(date);
  };


  const handleDayClick = (d: React.SetStateAction<Date>) => {
    setD(d);
    // console.log(d);
    // onChange(d);
  };

  const monthData = [
    [new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date()],
    [new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date()],
    [new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date()],
    [new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date()],
    [new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date()]
  ];

  return (
    <div className="calendar">
      <header>
        <button 
          type="button"
          onClick={handlePrevMonthButtonClick}
        >
          {'<'}
        </button>
        <select onChange={handleSelectChange}>
          {monthNames.map((name, index) =>
            <option key={name} value={index}>{name}</option>
          )}
        </select>
        <select onChange={handleSelectChange}>
          {years.map(year => 
            <option key={year} value={year}>{year}</option>
          )}
        </select>
        <button 
          type="button"
          onClick={handleNextMonthButtonClick}
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
          {monthData.map((week, index) => 
            <tr key={index} className='week'>
              {week.map((date, index) => 
                date 
                  ? <td 
                    className='day' 
                    key={index}
                    onClick={() => handleDayClick(d)}
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
};

Calendar.defaultProps = {
  years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023],
  monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
  weekDayNames: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
  date: new Date(),
//  onChange: Function.prototype,
};