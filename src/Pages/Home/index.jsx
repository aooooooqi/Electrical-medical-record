import React, { Component, useState, useRef } from "react";
import { Nav, Avatar, Form, Checkbox, Button, Radio, RadioGroup, Space, DatePicker, Calendar } from '@douyinfe/semi-ui';
import { IconSemiLogo, IconFeishuLogo, IconHelpCircle, IconBell } from '@douyinfe/semi-icons';
import styles from '../../index.css';

const MouseDraggableCalendar = ({ mode, calendarDisplayValue }) => {
  const dailyEventStyle = {
    position: 'absolute',
    left: '0',
    right: '0',
    borderRadius: '3px',
    boxSizing: 'border-box',
    border: 'var(--semi-color-primary) 1px solid',
    padding: '10px',
    backgroundColor: 'var(--semi-color-primary-light-default)',
    overflow: 'hidden',
    cursor: 'pointer',
  };

  const allDayStyle = {
    borderRadius: '3px',
    boxSizing: 'border-box',
    border: 'var(--semi-color-bg-1) 1px solid',
    padding: '2px 4px',
    backgroundColor: 'var(--semi-color-primary-light-active)',
    height: '100%',
    overflow: 'hidden',
  };

  const [events, setEvents] = useState([]);
  const calendarRef = useRef(null);
  const [draggingEvent, setDraggingEvent] = useState(null);

  const handleCalendarClick = (e, date) => {
    console.log(e, date);
    const newEvent = {
      key: Date.now().toString(),
      start: new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes()
      ),
      end: new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours() + 1,
        date.getMinutes()
      ),
      children: (
        <div style={dailyEventStyle}>{`${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`}</div>
      ),
    };

    setEvents([...events, newEvent]);

  }

  const handleDateGridClick = (e) => {
    const calendarElement = calendarRef.current;
    if (!calendarElement) return;

    const rect = calendarElement.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top; 

    const dayWidth = rect.width / (mode === 'week' ? 7 : 1); // Width of each day column for week view
    let clickedDate = new Date(calendarDisplayValue);

    if (mode === 'day' || mode === 'week') {
      const clickedDayIndex = Math.floor(clickX / dayWidth);
      if (mode === 'week') {
        clickedDate.setDate(calendarDisplayValue.getDate() - calendarDisplayValue.getDay() + clickedDayIndex);
      }

      const hoursInDay = 24;
      const hourHeight = rect.height / hoursInDay;
      const clickedHour = Math.floor(clickY / hourHeight); // Adjusting for 5-hour difference
      const clickedMinutes = ((clickY % hourHeight) >= 30) ? 30 : 0;

      if (clickedHour < 0 || clickedHour >= 24) return;

      const newEvent = {
        key: Date.now().toString(),
        start: new Date(
          clickedDate.getFullYear(),
          clickedDate.getMonth(),
          clickedDate.getDate(),
          clickedHour,
          clickedMinutes
        ),
        end: new Date(
          clickedDate.getFullYear(),
          clickedDate.getMonth(),
          clickedDate.getDate(),
          clickedHour + 1,
          clickedMinutes
        ),
        children: (
          <div style={dailyEventStyle}>{`${clickedDate.getMonth() + 1}月${clickedDate.getDate()}日 ${clickedHour}:${clickedMinutes.toString().padStart(2, '0')}`}</div>
        ),
      };

      setEvents([...events, newEvent]);
    } else if (mode === 'month') {
      const clickedDayIndex = Math.floor(clickX / dayWidth);
      clickedDate.setDate(calendarDisplayValue.getDate() - calendarDisplayValue.getDay() + clickedDayIndex);

      const newEvent = {
        key: Date.now().toString(),
        start: new Date(clickedDate.getFullYear(), clickedDate.getMonth(), clickedDate.getDate(), 0, 0),
        end: new Date(clickedDate.getFullYear(), clickedDate.getMonth(), clickedDate.getDate(), 23, 59),
        children: (
          <div style={allDayStyle}>{`${clickedDate.getMonth() + 1}月${clickedDate.getDate()}日 - All Day Event`}</div>
        ),
      };

      setEvents([...events, newEvent]);
    }
  };

  const handleMouseDown = (e, eventId) => {
    setDraggingEvent(eventId);
  };

  const handleMouseMove = (e) => {
    if (!draggingEvent) return;

    const calendarElement = calendarRef.current;
    const rect = calendarElement.getBoundingClientRect();
    const mouseY = e.clientY - rect.top + window.scrollY; // Adjust for scroll position
    const hourHeight = 60;
    const minHeight = 20;

    const newDuration = Math.max(minHeight, Math.round(mouseY / hourHeight) * 20);

    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.key === draggingEvent ? { ...event, duration: newDuration } : event
      )
    );
  };

  const handleMouseUp = () => {
    setDraggingEvent(null);
  };

  return (
    <div
      ref={calendarRef}
      // onClick={handleDateGridClick}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{ position: 'relative', height: '700px', width: '100%', cursor: 'pointer' }}
    >
      <Calendar
        height={700}
        mode={mode}
        displayValue={calendarDisplayValue}
        events={events}
        onClick={handleCalendarClick}
      />
    </div>
  );
};

class CustomComponent extends Component {
  constructor() {
    super();
    this.state = {
      mode: 'week',
      displayValue: new Date(2019, 6, 23, 8, 32, 0),
    };
  }

  onSelect = (e) => {
    this.setState({
      mode: e.target.value,
    });
  };

  onChangeDate = (e) => {
    this.setState({
      displayValue: e,
    });
  };

  render() {
    const { mode, displayValue } = this.state;

    return (
      <div className={styles.frame} style={{ padding: '2%', height: '100%', boxSizing: 'border-box' }}>
        <Nav
          mode="horizontal"
          header={{
            logo: <IconSemiLogo className={styles.semiIconsSemiLogo} />,
            text: "Semi Templates",
          }}
          footer={
            <div className={styles.dIv} style={{ display: 'flex', alignItems: 'center', gap: '1vw' }}>
              <IconFeishuLogo size="large" className={styles.semiIconsFeishuLogo} />
              <IconHelpCircle size="large" className={styles.semiIconsFeishuLogo} />
              <IconBell size="large" className={styles.semiIconsFeishuLogo} />
              <Avatar
                size="small"
                src="https://sf6-cdn-tos.douyinstatic.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/avatarDemo.jpeg"
                color="blue"
                className={styles.avatar}
              >
                示例
              </Avatar>
            </div>
          }
          className={styles.nav}
          style={{ width: '100%' }}
        >
          <Nav.Item itemKey="Home" link="/Home" text="Home" />
          <Nav.Item itemKey="Client_detail" link="/Client_detail" text="Client Detail" />
          <Nav.Item itemKey="Session_details" link="/Session_details" text="Session Details" />
        </Nav>

        <div className={styles.main} style={{ marginTop: '2%', flexGrow: 1, width: '100%' }}>
          <Space vertical align="start" style={{ width: '100%' }}>
            <RadioGroup onChange={this.onSelect} value={mode} type="button">
              <Radio value={'day'}>日视图</Radio>
              <Radio value={'week'}>周视图</Radio>
              <Radio value={'month'}>月视图</Radio>
            </RadioGroup>
            <DatePicker value={displayValue} onChange={this.onChangeDate} style={{ width: '100%' }} />
            <MouseDraggableCalendar mode={mode} calendarDisplayValue={displayValue} />
          </Space>
        </div>
      </div>
    );
  }
}

export default CustomComponent;
