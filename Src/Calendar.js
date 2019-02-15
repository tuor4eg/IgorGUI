/**
 * Form to select date
 * https://github.com/tuor4eg/
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import PropTypes from 'prop-types';

import { colors } from './const';

LocaleConfig.locales.ru = {
  monthNames: [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ],
  monthNamesShort: [
    'Янв.',
    'Февр.',
    'Март',
    'Апр.',
    'Май',
    'Июнь',
    'Июль',
    'Авг.',
    'Сент.',
    'Окт.',
    'Нояб.',
    'Дек.',
  ],
  dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
  dayNamesShort: ['Вс', 'Пн.', 'Вт.', 'Ср.', 'Чт.', 'Пт.', 'Сб.'],
};

LocaleConfig.defaultLocale = 'ru';

const oneTraining = { key: 'oneTraining', color: 'white', selectedDotColor: 'white' };
const twoTrainings = { key: 'twoTrainings', color: 'white', selectedDotColor: 'white' };
const threeMore = { key: 'threeMore', color: 'white' };

export default class CalendarForm extends Component {
  selectDate = async (date) => {
    const { changeDate } = this.props;
    changeDate(date);
  };

  render() {
    const { calendarMarks, firstDate } = this.props;
    const makeMarks = Object.keys(calendarMarks).reduce((acc, element) => {
      if (calendarMarks[element] === 1) {
        return {
          ...acc,
          [element]: { dots: [oneTraining], selected: true, selectedColor: colors.grey },
        };
      }
      if (calendarMarks[element] === 2) {
        return {
          ...acc,
          [element]: {
            dots: [oneTraining, twoTrainings],
            selected: true,
            selectedColor: colors.grey,
          },
        };
      }
      return {
        ...acc,
        [element]: {
          dots: [oneTraining, twoTrainings, threeMore],
          selected: true,
          selectedColor: colors.grey,
        },
      };
    }, {});
    return (
      <View>
        <Calendar
          current={new Date(firstDate)}
          onDayPress={day => this.selectDate(day.timestamp)}
          onDayLongPress={(day) => {
            console.log('selected day', day);
          }}
          monthFormat="yyyy MM"
          onMonthChange={(month) => {
            console.log('month changed', month);
          }}
          hideArrows={false}
          renderArrow={direction => (direction === 'left' ? <Text>назад</Text> : <Text>вперед</Text>)
          }
          hideExtraDays={false}
          disableMonthChange={false}
          firstDay={1}
          hideDayNames={false}
          showWeekNumbers
          onPressArrowLeft={substractMonth => substractMonth()}
          onPressArrowRight={addMonth => addMonth()}
          markedDates={makeMarks}
          markingType="multi-dot"
        />
      </View>
    );
  }
}

CalendarForm.propTypes = {
  changeDate: PropTypes.func.isRequired,
  onClickCalendar: PropTypes.func.isRequired,
  getTrainingList: PropTypes.func.isRequired,
  firstDate: PropTypes.number.isRequired,
  lastDate: PropTypes.number.isRequired,
  calendarMarks: PropTypes.instanceOf(Object).isRequired,
};
