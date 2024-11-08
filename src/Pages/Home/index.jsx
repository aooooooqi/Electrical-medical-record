import React, { Component, useState, useRef } from "react";
import { Nav, Avatar, Form, Checkbox, Button, Radio, RadioGroup, Space, DatePicker, Calendar } from '@douyinfe/semi-ui';
import { IconSemiLogo, IconFeishuLogo, IconHelpCircle, IconBell } from '@douyinfe/semi-icons';
import styles from '../../index.css';

const MouseDraggableCalendar = ({ mode, calendarDisplayValue }) => {
  const [events, setEvents] = useState([]);
  const calendarRef = useRef(null);

  const handleCalendarClick = (e, date) => {
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
        <div style={getEventStyle(mode)}>{
          mode === 'month'
            ? `${date.getMonth() + 1}月${date.getDate()}日 - All Day Event`
            : `${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`
        }</div>
      ),
    };

    setEvents([...events, newEvent]);
  };

  const getEventStyle = (mode) => {
    return mode === 'month'
      ? {
          borderRadius: '3px',
          boxSizing: 'border-box',
          border: 'var(--semi-color-bg-1) 1px solid',
          padding: '2px 4px',
          backgroundColor: 'var(--semi-color-primary-light-active)',
          height: '100%',
          overflow: 'hidden',
        }
      : {
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
  };

  return (
    <div
      ref={calendarRef}
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
      displayValue: new Date(),
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
