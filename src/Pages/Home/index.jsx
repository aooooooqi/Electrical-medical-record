import React, { Component } from "react";
import { Nav, Avatar, Form, Checkbox, Button, Radio, RadioGroup, Space, DatePicker, Calendar } from '@douyinfe/semi-ui';
import { IconSemiLogo, IconFeishuLogo, IconHelpCircle, IconBell } from '@douyinfe/semi-icons';
import styles from '../../index.css';

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
  }

  onChangeDate = (e) => {
    this.setState({
      displayValue: e,
    });
  }

  render() {
    const { mode, displayValue } = this.state;
    const isMonthView = mode === 'month';
    const dailyEventStyle = {
      borderRadius: '3px',
      boxSizing: 'border-box',
      border: 'var(--semi-color-primary) 1px solid',
      padding: '10px',
      backgroundColor: 'var(--semi-color-primary-light-default)',
      height: '100%',
      overflow: 'hidden',
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
    const dailyStyle = isMonthView ? allDayStyle : dailyEventStyle;
    const events = [
      {
        key: '0',
        start: new Date(2019, 5, 25, 14, 45, 0),
        end: new Date(2019, 6, 26, 6, 18, 0),
        children: <div style={dailyStyle}>6月25日 14:45 ~ 7月26日 6:18</div>,
      },
      // Additional events here...
    ];

    return (
      <div className={styles.frame}>
        <Nav
          mode="horizontal"
          header={{
            logo: <IconSemiLogo className={styles.semiIconsSemiLogo} />,
            text: "Semi Templates",
          }}
          footer={
            <div className={styles.dIv}>
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
        >
          <Nav.Item itemKey="Home" link="/Home" text="Home" />
          <Nav.Item itemKey="Client_detail" link="/Client_detail" text="Client Detail" />
          <Nav.Item itemKey="Session_details" link="/Session_details" text="Session Details" />
        </Nav>
        <div className={styles.main}>
          <Space vertical align="start">
            <RadioGroup onChange={this.onSelect} value={mode} type="button">
              <Radio value={'day'}>日视图</Radio>
              <Radio value={'week'}>周视图</Radio>
              <Radio value={'month'}>月视图</Radio>
              <Radio value={'range'}>多日视图</Radio>
            </RadioGroup>
            <DatePicker value={displayValue} onChange={this.onChangeDate} />
            <Calendar
              height={400}
              mode={mode}
              displayValue={displayValue}
              events={events}
              minEventHeight={40}
              range={mode === 'range' ? [new Date(2019, 6, 23), new Date(2019, 6, 26)] : []}
            />
          </Space>
        </div>
      </div>
    );
  }
}

export default CustomComponent;
