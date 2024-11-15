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
import styles from "../../index.css";

const MouseDraggableCalendar = ({ mode, calendarDisplayValue }) => {
  const [events, setEvents] = useState([]);
  const [viewingEvent, setViewingEvent] = useState(null);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState("right");
  const [isModalVisible, setIsModalVisible] = useState(false);
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
        isNew: true,
      };

      setViewingEvent(newEvent);
      setIsModalVisible(true); // 打开 Modal
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
  
      // 默认设置位置为右侧
      let position = "right";
  
      // 如果右侧空间不足，将位置设为左侧
      if (rect.right + 300 > windowWidth) {
        position = "left";
      } 
      // 如果左侧空间不足且已经设置为左侧，将位置切换回右侧
      else if (rect.left < 300 && position === "left") {
        position = "right";
      }
  
      setPopoverPosition(position);
    }
  };
  const handleFormSubmit = (values) => {
    let updatedEvents = [];

    if (viewingEvent.isNew) {
      // 新建事件，添加到事件列表
      const newEvent = {
        ...viewingEvent,
        title: values.name || "untitled",
        start: values.startTime,
        end: values.endTime,
        participants: values.participants,
        isNew: false,
      };
      updatedEvents = [...events, newEvent];
    } else {
      // 编辑已存在的事件
      updatedEvents = events.map((event) =>
        event.key === viewingEvent.key
          ? {
              ...event,
              title: values.name || "untitled",
              start: values.startTime,
              end: values.endTime,
              participants: values.participants,
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
      style={{ position: "relative", height: "700px", width: "100%", cursor: "pointer" }}
    >
      <Calendar
        height={700}
        mode={mode}
        displayValue={calendarDisplayValue}
        events={events.map(event => ({
          ...event,
          children: (
            event.isNew ? null : (
              <Popover
                content={
                  <div>
                    <p>事件标题: {event.title}</p>
                    <p>
                      时间: {event.start.getHours()}:{event.start.getMinutes().toString().padStart(2, '0')} - {event.end.getHours()}:{event.end.getMinutes().toString().padStart(2, '0')}
                    </p>
                    <p>参与者: {event.participants.join(', ')}</p>
                    <Button onClick={() => {
                      setViewingEvent(event);
                      setIsModalVisible(true); // 打开 Modal 以编辑事件
                      setPopoverVisible(false); // 关闭 Popover
                    }}>
                      修改
                    </Button>
                  </div>
                }
                trigger="click"
                visible={viewingEvent && viewingEvent.key === event.key && popoverVisible}
                onVisibleChange={(visible) => setPopoverVisible(visible)}
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
          )
        }))}
        onClick={handleCalendarClick}
      />

      {/* Modal 部分 */}
      {viewingEvent && (
        <Modal
          title={viewingEvent.isNew ? "创建新事件" : "编辑事件"}
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
            }}
          >
            <Form.Input
              field="name"
              label="事件标题"
              style={{ marginBottom: 12 }}
              placeholder="请输入事件标题"
            />
            <Form.DatePicker
              field="startTime"
              type="dateTime"
              label="开始时间"
              style={{ marginBottom: 12 }}
            />
            <Form.DatePicker
              field="endTime"
              type="dateTime"
              label="结束时间"
              style={{ marginBottom: 12 }}
            />
            <Form.Select
              field="participants"
              label="添加参与者"
              style={{ width: "100%", marginBottom: 12 }}
              multiple
            >
              <Select.Option value="昊民">昊民</Select.Option>
              <Select.Option value="莫桐">莫桐</Select.Option>
              <Select.Option value="元硕">元硕</Select.Option>
            </Form.Select>
            <Button theme="solid" type="primary" htmlType="submit" style={{ marginRight: 12 }}>
              保存
            </Button>
            <Button theme="border" type="secondary" onClick={() => {
              if (viewingEvent.isNew) {
                setViewingEvent(null);
              }
              setIsModalVisible(false);
            }}>
              取消
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
          <Nav.Item itemKey="Home" link="/Home" text="首页" />
        <Nav.Item itemKey="Client_detail" link="/Client_detail" text="客户详情" />
        <Nav.Item itemKey="Session_details" link="/Session_details" text="病人信息" />
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
