import React, { Component, useState, useRef } from "react";
import {
  Nav,
  Avatar,
  Form,
  Checkbox,
  Button,
  Radio,
  RadioGroup,
  Space,
  DatePicker,
  Calendar,
  Modal,
  Input,
  Card,
} from "@douyinfe/semi-ui";
import {
  IconSemiLogo,
  IconFeishuLogo,
  IconHelpCircle,
  IconBell,
} from "@douyinfe/semi-icons";
import styles from "../../index.css";

const MouseDraggableCalendar = ({ mode, calendarDisplayValue }) => {
  const [events, setEvents] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [viewingEvent, setViewingEvent] = useState(null);
  const calendarRef = useRef(null);

  const handleCalendarClick = (e, date) => {
    setSelectedDate(date);
    setIsModalVisible(true);
  };

  const handleAddCustomEvent = () => {
    if (selectedDate && newEventTitle) {
      const startHour = selectedDate.getHours();
      const startMinute = selectedDate.getMinutes().toString().padStart(2, '0');
      const endHour = (startHour + 1) % 24;
      const endMinute = startMinute;

      const newEvent = {
        key: Date.now().toString(),
        title: newEventTitle,
        start: new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate(),
          startHour,
          selectedDate.getMinutes()
        ),
        end: new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate(),
          endHour,
          selectedDate.getMinutes()
        ),
        children: (
          <Card
            shadows='hover'
            style={{ height: '100%', width: '100%', border: '1px solid #1890ff' }}
            bodyStyle={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onClick={() => handleCardClick(newEvent)}
          >
            {newEventTitle} ({startHour}:{startMinute} - {endHour}:{endMinute})
          </Card>
        ),
      };

      setEvents([...events, newEvent]);
      setIsModalVisible(false);
      setNewEventTitle("");
    }
  };

  const handleCardClick = (event) => {
    setViewingEvent(event);
  };

  return (
    <div
      ref={calendarRef}
      style={{ position: "relative", height: "700px", width: "100%", cursor: "pointer" }}
    >
      <Calendar
        height={700}
        mode={mode}
        displayValue={calendarDisplayValue}
        events={events}
        onClick={handleCalendarClick}
      />
      <Modal
        title="Add Custom Event"
        visible={isModalVisible}
        onOk={handleAddCustomEvent}
        onCancel={() => setIsModalVisible(false)}
      >
        <Input
          placeholder="Enter event title"
          value={newEventTitle}
          onChange={(value) => setNewEventTitle(value)}
        />
      </Modal>
      {viewingEvent && (
        <Card
          title="Event Details"
          style={{ maxWidth: 600, margin: '10px auto' }}
          bodyStyle={{ padding: '20px' }}
        >
          <p>Event Title: {viewingEvent.title}</p>
          <p>Start Time: {viewingEvent.start.toLocaleTimeString()}</p>
          <p>End Time: {viewingEvent.end.toLocaleTimeString()}</p>
          <p>Additional information about the event can go here.</p>
        </Card>
      )}
    </div>
  );
};

class CustomComponent extends Component {
  constructor() {
    super();
    this.state = {
      mode: "week",
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
      <div
        className={styles.frame}
        style={{ padding: "2%", height: "100%", boxSizing: "border-box" }}
      >
        <Nav
          mode="horizontal"
          header={{
            logo: <IconSemiLogo className={styles.semiIconsSemiLogo} />,
            text: "Semi Templates",
          }}
          footer={
            <div
              className={styles.dIv}
              style={{ display: "flex", alignItems: "center", gap: "1vw" }}
            >
              <IconFeishuLogo
                size="large"
                className={styles.semiIconsFeishuLogo}
              />
              <IconHelpCircle
                size="large"
                className={styles.semiIconsFeishuLogo}
              />
              <IconBell
                size="large"
                className={styles.semiIconsFeishuLogo}
              />
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
          style={{ width: "100%" }}
        >
          <Nav.Item itemKey="Home" link="/Home" text="Home" />
          <Nav.Item
            itemKey="Client_detail"
            link="/Client_detail"
            text="Client Detail"
          />
          <Nav.Item
            itemKey="Session_details"
            link="/Session_details"
            text="Session Details"
          />
        </Nav>

        <div
          className={styles.main}
          style={{ marginTop: "2%", flexGrow: 1, width: "100%" }}
        >
          <Space vertical align="start" style={{ width: "100%" }}>
            <RadioGroup onChange={this.onSelect} value={mode} type="button">
              <Radio value={"day"}>日视图</Radio>
              <Radio value={"week"}>周视图</Radio>
              <Radio value={"month"}>月视图</Radio>
            </RadioGroup>
            <DatePicker
              value={displayValue}
              onChange={this.onChangeDate}
              style={{ width: "100%" }}
            />
            <MouseDraggableCalendar
              mode={mode}
              calendarDisplayValue={displayValue}
            />
          </Space>
        </div>
      </div>
    );
  }
}

export default CustomComponent;
