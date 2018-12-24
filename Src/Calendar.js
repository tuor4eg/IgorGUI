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
    selectDate = (date) => {
        this.props.changeDate(date);
        this.props.getTrainingList(date);
        this.props.onClickCalendar();
    }

    render() {
        const today = new Date(this.props.today);
        const strate = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
        return (
          <View>
            <Calendar
            current={new Date(this.props.today)}
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
            markedDates={{
                [strate]: {selected: true, marked: true, selectedColor: 'blue'},
                '2018-12-16': {marked: true},
                '2018-12-20': {marked: true, dotColor: 'red', activeOpacity: 0},
                '2018-12-31': {disabled: true, disableTouchEvent: true}
              }}
            />
          </View>
        );
    }
}