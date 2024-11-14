import React, { Component, useState, useRef, useEffect } from "react";
import {
  Nav,
  Avatar,
  Form,
  Button,
  Radio,
  RadioGroup,
  Space,
  DatePicker,
  Calendar,
  Input,
  Card,
  Popover,
  Select,
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
  const [viewingEvent, setViewingEvent] = useState(null);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState("right");
  const calendarRef = useRef(null);

  const handleCalendarClick = (e, date) => {
    if (date) {
      const startHour = date.getHours();
      const startMinute = date.getMinutes().toString().padStart(2, '0');
      const endHour = (startHour + 1) % 24;
      const endMinute = startMinute;

      const newEvent = {
        key: Date.now().toString(),
        title: "untitled",
        start: new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          startHour,
          date.getMinutes()
        ),
        end: new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          endHour,
          date.getMinutes()
        ),
        participants: [],
        style: {
          width: '100vw',
          height: '90vh'
        },
        isNew: true,
      };
      determinePopoverPosition(e.target);
      
      setEvents((prevEvents) => [...prevEvents, newEvent]);
      setViewingEvent(newEvent);
      setPopoverVisible(true);
    }
  };

  const handleCardClick = (event, e) => {
    setViewingEvent(event);
    determinePopoverPosition(e.target);
    setPopoverVisible(true);
  };

  const closePopover = () => {
    if (viewingEvent && viewingEvent.isNew) {
      setEvents((prevEvents) => prevEvents.filter(event => event.key !== viewingEvent.key));
    }
    setViewingEvent(null);
    setPopoverVisible(false);
  };

  const determinePopoverPosition = (eventElement) => {
    if (eventElement) {
      const rect = eventElement.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      let position = "right";

      if (rect.right + 300 > windowWidth) {
        position = "left";
      } else if (rect.left < 300) {
        position = "right";
      }

      if (rect.bottom + 300 > windowHeight) {
        position = "top";
      }

      setPopoverPosition(position);
    }
  };

  const handleFormSubmit = (values) => {
    const updatedEvents = events.map((event) =>
      event.key === viewingEvent.key
        ? {
            ...event,
            title: values.name || "untitled",
            start: values.startTime,
            end: values.endTime,
            participants: values.participants,
            isNew: false,
          }
        : event
    );

    setEvents(updatedEvents);

    // 保存后清空 viewingEvent
    setViewingEvent(null);
    setPopoverVisible(false);
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
        events={events.map(event => ({
          ...event,
          children: (
            <Popover
              content={
                <Form
                  onSubmit={handleFormSubmit}
                  initValues={{
                    name: event.title,
                    startTime: event.start,
                    endTime: event.end,
                    participants: event.participants,
                  }}
                >
                  <Form.Input
                    field="name"
                    label="Event Title"
                    style={{ marginBottom: 12 }}
                    placeholder="Enter event title"
                  />
                  <Form.DatePicker
                    field="startTime"
                    type="dateTime"
                    label="Start Time"
                    style={{ marginBottom: 12 }}
                  />
                  <Form.DatePicker
                    field="endTime"
                    type="dateTime"
                    label="End Time"
                    style={{ marginBottom: 12 }}
                  />
                  <Form.Select
                    field="participants"
                    label="Add Participants"
                    style={{ width: "100%", marginBottom: 12 }}
                    multiple
                  >
                    <Select.Option value="昊民">昊民</Select.Option>
                    <Select.Option value="莫桐">莫桐</Select.Option>
                    <Select.Option value="元硕">元硕</Select.Option>
                  </Form.Select>
                  <Button theme="solid" type="primary" htmlType="submit" style={{ marginRight: 12 }}>
                    Save Changes
                  </Button>
                  <Button theme="border" type="secondary" onClick={closePopover}>
                    Close
                  </Button>
                </Form>
              }
              trigger="click"
              visible={viewingEvent && viewingEvent.key === event.key && popoverVisible}
              clickToHide={false}
              getPopupContainer={() => document.body}
              position={popoverPosition}
              showArrow
            >
              <Card
                shadows="hover"
                style={{ height: '100%', width: '100%', border: '1px solid #1890ff' }}
                bodyStyle={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                onClick={(e) => handleCardClick(event, e)}
                data-event-key={event.key}
              >
                {event.title} ({event.start.getHours()}:{event.start.getMinutes().toString().padStart(2, '0')} - {event.end.getHours()}:{event.end.getMinutes().toString().padStart(2, '0')})
              </Card>
            </Popover>
          )
        }))}
        onClick={handleCalendarClick}
      />
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
