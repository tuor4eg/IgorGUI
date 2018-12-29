/**
 * Form to select date
 * https://github.com/tuor4eg/
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, Text} from 'react-native';
import { Calendar, CalendarList, Agenda, LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales['ru'] = {
    monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
    monthNamesShort: ['Янв.','Февр.','Март','Апр.','Май','Июнь','Июль','Авг.','Сент.','Окт.','Нояб.','Дек.'],
    dayNames: ['Воскресенье', 'Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'],
    dayNamesShort: ['Вс', 'Пн.','Вт.','Ср.','Чт.','Пт.','Сб.']
  };
  
  LocaleConfig.defaultLocale = 'ru';

export default class CalendarForm extends Component {
    selectDate = async (date) => {
      await this.props.changeDate(date);
      await this.props.getTrainingList(this.props.firstDate, this.props.lastDate);
      this.props.onClickCalendar();
    }

    render() {
        const calendarMarks = this.props.calendarMarks
        const makeMarks = Object.keys(calendarMarks).reduce((acc, element) => {
          if (calendarMarks[element] === 1) {
            return {...acc, [element]: {dots: [oneTraining], selected: true, selectedColor: 'green'}}
          }
          if (calendarMarks[element] === 2) {
            return {...acc, [element]: {dots: [oneTraining, twoTrainings], selected: true, selectedColor: 'pink'}}
          }
          return  {...acc, [element]: {dots: [oneTraining, twoTrainings, threeMore], selected: true, selectedColor: 'powderblue'}}
        }, {});
        return (
          <View>
            <Calendar
            current={new Date(this.props.firstDate)}
            onDayPress={(day) => this.selectDate(day.timestamp)}
            onDayLongPress={(day) => {console.log('selected day', day)}}
            monthFormat={'yyyy MM'}
            onMonthChange={(month) => {console.log('month changed', month)}}
            hideArrows={false}
            renderArrow={(direction) => direction === 'left' ? <Text>назад</Text> : <Text>вперед</Text>}
            hideExtraDays={false}
            disableMonthChange={false}
            firstDay={1}
            hideDayNames={false}
            showWeekNumbers={true}
            onPressArrowLeft={substractMonth => substractMonth()}
            onPressArrowRight={addMonth => addMonth()}
            markedDates={makeMarks}
            markingType={'multi-dot'}
            />
          </View>
        );
    }
}

const oneTraining = {key:'oneTraining', color: 'red', selectedDotColor: 'blue'};
const twoTrainings = {key:'twoTrainings', color: 'blue', selectedDotColor: 'blue'};
const threeMore = {key:'threeMore', color: 'green'};