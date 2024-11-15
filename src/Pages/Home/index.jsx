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
  Modal,
} from "@douyinfe/semi-ui";
import {
  IconSemiLogo,
  IconFeishuLogo,
  IconHelpCircle,
  IconBell,
} from "@douyinfe/semi-icons";
import { useNavigate } from "react-router-dom";
import styles from "../../index.css";

const MouseDraggableCalendar = ({ mode, calendarDisplayValue }) => {
  const [events, setEvents] = useState([]);
  const [viewingEvent, setViewingEvent] = useState(null);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState("right");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const calendarRef = useRef(null);
  const navigate = useNavigate();

  const handleCalendarClick = (e, date) => {
    if (date) {
      const startHour = date.getHours();
      const startMinute = date.getMinutes().toString().padStart(2, "0");
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
        isNew: true,
        notes: "",
      };

      setViewingEvent(newEvent);
      setIsModalVisible(true);
    }
  };

  const handleCardClick = (event, e) => {
    setViewingEvent(event);
    determinePopoverPosition(e.target);
    setPopoverVisible(true);
  };

  const determinePopoverPosition = (eventElement) => {
    if (eventElement) {
      const rect = eventElement.getBoundingClientRect();
      const windowWidth = window.innerWidth;

      let position = "right";

      if (rect.right + 300 > windowWidth) {
        position = "left";
      } else if (rect.left < 300 && position === "left") {
        position = "right";
      }

      setPopoverPosition(position);
    }
  };

  const handleFormSubmit = (values) => {
    let updatedEvents = [];

    if (viewingEvent.isNew) {
      const newEvent = {
        ...viewingEvent,
        title: values.name || "untitled",
        start: values.startTime,
        end: values.endTime,
        participants: values.participants,
        isNew: false,
        key: Date.now().toString(),
        notes: values.notes,
      };
      updatedEvents = [...events, newEvent];
    } else {
      updatedEvents = events.map((event) =>
        event.key === viewingEvent.key
          ? {
              ...event,
              title: values.name || "untitled",
              start: values.startTime,
              end: values.endTime,
              participants: values.participants,
              key: Date.now().toString(),
              notes: values.notes,
            }
          : event
      );
    }

    setEvents(updatedEvents);
    setViewingEvent(null);
    setIsModalVisible(false);
  };

  return (
    <div
      ref={calendarRef}
      style={{
        position: "relative",
        height: "700px",
        width: "100%",
        cursor: "pointer",
      }}
    >
      <Calendar
        height={700}
        mode={mode}
        displayValue={calendarDisplayValue}
        events={events.map((event) => ({
          ...event,
          children: event.isNew ? null : (
            <Popover
              content={
                <div>
                  <p>Event Title: {event.title}</p>
                  <p>
                    Time: {event.start.getHours()}:
                    {event.start.getMinutes().toString().padStart(2, "0")} - {" "}
                    {event.end.getHours()}:
                    {event.end.getMinutes().toString().padStart(2, "0")}
                  </p>
                  <p>Participants: {event.participants.join(", ")}</p>
                  <Button
                    onClick={() => {
                      setViewingEvent(event);
                      setIsModalVisible(true);
                      setPopoverVisible(false);
                    }}
                    style={{ marginRight: 8 }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => {
                      navigate("/Client_detail");
                      setPopoverVisible(false);
                    }}
                  >
                    View Client Information
                  </Button>
                </div>
              }
              trigger="click"
              visible={
                viewingEvent &&
                viewingEvent.key === event.key &&
                popoverVisible
              }
              onVisibleChange={(visible) => setPopoverVisible(visible)}
              getPopupContainer={() => document.body}
              position={popoverPosition}
              showArrow
            >
              <Card
                shadows="hover"
                style={{
                  height: "100%",
                  width: "100%",
                  border: "1px solid #1890ff",
                }}
                bodyStyle={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={(e) => handleCardClick(event, e)}
                data-event-key={event.key}
              >
                {event.title} ({event.start.getHours()}:
                {event.start.getMinutes().toString().padStart(2, "0")} - {" "}
                {event.end.getHours()}:
                {event.end.getMinutes().toString().padStart(2, "0")})
              </Card>
            </Popover>
          ),
        }))}
        onClick={handleCalendarClick}
      />

      {viewingEvent && (
        <Modal
          title={viewingEvent.isNew ? "Create New Event" : "Edit Event"}
          visible={isModalVisible}
          onCancel={() => {
            if (viewingEvent.isNew) {
              setViewingEvent(null);
            }
            setIsModalVisible(false);
          }}
          footer={null}
        >
          <Form
            onSubmit={handleFormSubmit}
            initValues={{
              name: viewingEvent.title,
              startTime: viewingEvent.start,
              endTime: viewingEvent.end,
              participants: viewingEvent.participants,
              notes: viewingEvent.notes,
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
              <Select.Option value="Participant A">Participant A</Select.Option>
              <Select.Option value="Participant B">Participant B</Select.Option>
              <Select.Option value="Participant C">Participant C</Select.Option>
            </Form.Select>
            <Form.TextArea field="notes" label="Notes" style={{ marginBottom: 12 }} />
            <Button
              theme="solid"
              type="primary"
              htmlType="submit"
              style={{ marginRight: 12 }}
            >
              Save
            </Button>
            <Button
              theme="border"
              type="secondary"
              onClick={() => {
                if (viewingEvent.isNew) {
                  setViewingEvent(null);
                }
                setIsModalVisible(false);
              }}
            >
              Cancel
            </Button>
          </Form>
        </Modal>
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
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1vw",
              }}
            >
              <IconFeishuLogo size="large" className={styles.semiIconsFeishuLogo} />
              <IconHelpCircle size="large" className={styles.semiIconsFeishuLogo} />
              <IconBell size="large" className={styles.semiIconsFeishuLogo} />
              <Avatar
                size="small"
                src="https://sf6-cdn-tos.douyinstatic.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/avatarDemo.jpeg"
                color="blue"
                className={styles.avatar}
              >
                Demo
              </Avatar>
            </div>
          }
          className={styles.nav}
          style={{ width: "100%" }}
        >
          <Nav.Item itemKey="Home" link="#/Home" text="Home" />
          <Nav.Item itemKey="Session_details" link="#/Clients" text="Client Information" />
        </Nav>

        <div
          className={styles.main}
          style={{ marginTop: "2%", flexGrow: 1, width: "100%" }}
        >
          <Space vertical align="start" style={{ width: "100%" }}>
            <RadioGroup
              onChange={this.onSelect}
              value={mode}
              type="button"
            >
              <Radio value={"week"}>Week View</Radio>
              <Radio value={"month"}>Month View</Radio>
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
