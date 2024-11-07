import React, { Component, useState } from "react";
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

  const [events, setEvents] = useState([
    {
      key: '0',
      start: new Date(2019, 5, 25, 14, 45, 0),
      end: new Date(2019, 6, 26, 6, 18, 0),
      children: <div style={dailyEventStyle}>6月25日 14:45 ~ 7月26日 6:18</div>,
    },
    {
      key: '1',
      start: new Date(2019, 6, 18, 10, 0, 0),
      end: new Date(2019, 6, 30, 8, 0, 0),
      children: <div style={allDayStyle}>7月18日 10:00 ~ 7月30日 8:00</div>,
    },
    {
      key: '2',
      start: new Date(2019, 6, 19, 20, 0, 0),
      end: new Date(2019, 6, 23, 14, 0, 0),
      children: <div style={allDayStyle}>7月19日 20:00 ~ 7月23日 14:00</div>,
    },
    {
      key: '3',
      start: new Date(2019, 6, 21, 6, 0, 0),
      end: new Date(2019, 6, 25, 6, 0, 0),
      children: <div style={allDayStyle}>7月21日 6:00 ~ 7月25日 6:00</div>,
    },
    {
      key: '4',
      allDay: true,
      start: new Date(2019, 6, 22, 8, 0, 0),
      children: <div style={allDayStyle}>7月22日 全天</div>,
    },
    {
      key: '5',
      start: new Date(2019, 6, 22, 9, 0, 0),
      end: new Date(2019, 6, 23, 23, 0, 0),
      children: <div style={allDayStyle}>7月22日 9:00 ~ 7月23日 23:00</div>,
    },
    {
      key: '6',
      start: new Date(2019, 6, 23, 8, 32, 0),
      end: new Date(2019, 6, 23, 8, 42, 0),
      children: <div style={dailyEventStyle}>7月23日 8:32</div>,
    },
    {
      key: '7',
      start: new Date(2019, 6, 23, 14, 30, 0),
      end: new Date(2019, 6, 23, 20, 0, 0),
      children: <div style={dailyEventStyle}>7月23日 14:30-20:00</div>,
    },
    {
      key: '8',
      start: new Date(2019, 6, 25, 8, 0, 0),
      end: new Date(2019, 6, 27, 6, 0, 0),
      children: <div style={allDayStyle}>7月25日 8:00 ~ 7月27日 6:00</div>,
    },
    {
      key: '9',
      start: new Date(2019, 6, 26, 10, 0, 0),
      end: new Date(2019, 6, 27, 16, 0, 0),
      children: <div style={allDayStyle}>7月26日 10:00 ~ 7月27日 16:00</div>,
    },
  ]);

  const dateRender = (dateString) => {
    if (dateString === new Date(2019, 6, 23).toString()) {
      return (
        <>
          <div
            style={{ ...dailyEventStyle, top: '500px', height: 50 }}
          >
            吃饭 🍰
          </div>
          <div
            style={{ ...dailyEventStyle, top: '0', height: 400 }}
          >
            睡觉 😪
          </div>
          <div
            style={{ ...dailyEventStyle, top: '700px', height: 100 }}
          >
            打豆豆 🎮
          </div>
        </>
      );
    } else {
      return null;
    }
  };

  return (
    <Calendar 
      height={700} 
      mode={mode} 
      displayValue={calendarDisplayValue} 
      events={events} 
      dateGridRender={dateRender} 
    />
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
              <Radio value={'range'}>多日视图</Radio>
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
