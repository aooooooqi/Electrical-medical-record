import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import { Nav, Avatar, Tag, Descriptions, Select, TextArea, Button, Table } from '@douyinfe/semi-ui';
import { IconSemiLogo, IconFeishuLogo, IconHelpCircle, IconBell, IconMapPin, IconMail, IconUserCircle } from '@douyinfe/semi-icons';
import styles from './index.module.scss';

const ClientDetail = () => {
  const { id } = useParams(); // Get the client ID

  // Simulate client detail data, which could be fetched from the server
  const [customerDetails, setCustomerDetails] = useState({
    id: id,
    name: "Richard Hendricks",
    location: "Canada",
    email: "richard@gmail.com",
    description: "Chronic headache",
    tags: ["New Patient", "Priority Observation", "VIP"],
    contact: {
      appleAccount: "richard@icloud.com",
      googleAccount: "richard@gmail.com",
      instagram: "richard_aaa",
      facebook: "Richard Hendricks"
    },
    medicalHistory: [
      { key: "0", date: "2024-11-01", treatment: "Migraine treatment with prescribed medication", doctor: "Dr. Smith" },
      { key: "1", date: "2024-11-08", treatment: "Follow-up, condition improving", doctor: "Dr. Smith" },
      { key: "2", date: "2024-11-15", treatment: "Recovery check-up, all normal", doctor: "Dr. Johnson" },
    ]
  });

  // Handle adding a tag
  const handleAddTag = (value) => {
    if (value && !customerDetails.tags.includes(value)) {
      setCustomerDetails(prevState => ({
        ...prevState,
        tags: [...prevState.tags, value]
      }));
    }
  };

  // Handle removing a tag
  const handleRemoveTag = (removedTag) => {
    setCustomerDetails(prevState => ({
      ...prevState,
      tags: prevState.tags.filter(tag => tag !== removedTag)
    }));
  };

  return (
    <div className={styles.frame} style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
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
              Demo
            </Avatar>
          </div>
        }
        className={styles.nav}
      >
        <Nav.Item itemKey="Home" link="#/Home" text="Home" />
        <Nav.Item itemKey="Session_details" link="#/Clients" text="Client Information" />
      </Nav>
      <div className={styles.main}>
        <div className={styles.card}>
          <div className={styles.banner}>
            <div className={styles.frame4159}>
              <Avatar
                size="large"
                src="https://sf6-cdn-tos.douyinstatic.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/avatarDemo.jpeg"
                color="blue"
                className={styles.avatar2}
              >
                Demo
              </Avatar>
            </div>
            <div className={styles.name}>
              <p className={styles.richardHendricks}>{customerDetails.name}</p>
            </div>
          </div>
          <div className={styles.main2}>
            <div className={styles.descriptions}>
              <div className={styles.frame4152}>
                <IconMapPin className={styles.semiIconsMapPin} />
                <p className={styles.value}>{customerDetails.location}</p>
              </div>
              <div className={styles.frame4154}>
                <IconMail className={styles.semiIconsMapPin} />
                <p className={styles.value3}>{customerDetails.email}</p>
              </div>
              <div className={styles.frame4155}>
                <IconUserCircle className={styles.semiIconsMapPin} />
                <p className={styles.value4}>Description: {customerDetails.description}</p>
              </div>
            </div>
            <div className={styles.tags}>
              {customerDetails.tags.map((tag, index) => (
                <Tag
                  size="large"
                  color={index === 2 ? "orange" : "blue"}
                  className={styles.tag}
                  key={tag}
                  closable
                  onClose={() => handleRemoveTag(tag)}
                >
                  {tag}
                </Tag>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.panel}>
          <div className={styles.frame2}>
            <p className={styles.text}>Client Contact Information</p>
            <div className={styles.frame4160}>
              <Descriptions
                data={[
                  { key: "Apple Account", value: customerDetails.contact.appleAccount },
                  { key: "Google Account", value: customerDetails.contact.googleAccount },
                ]}
                align="justify"
                className={styles.descriptions2}
              />
              <Descriptions
                data={[
                  { key: "Instagram", value: customerDetails.contact.instagram },
                  { key: "Facebook", value: customerDetails.contact.facebook },
                ]}
                align="justify"
                className={styles.descriptions2}
              />
            </div>
          </div>
          <div className={styles.components}>
            <div className={styles.inputs}>
              <Select
                placeholder="Select Status"
                maxTagCount={3}
                className={styles.selectTrigger}
                onChange={handleAddTag}
              >
                <Select.Option value="New Patient">New Patient</Select.Option>
                <Select.Option value="Follow-up">Follow-up</Select.Option>
                <Select.Option value="Under Treatment">Under Treatment</Select.Option>
                <Select.Option value="Recovering">Recovering</Select.Option>
              </Select>
              <TextArea
                maxCount={100}
                placeholder="Remarks"
                validateStatus="default"
                className={styles.textArea}
              />
              <Button
                theme="solid"
                icon={<IconFeishuLogo />}
                className={styles.button}
              >
                Update Information
              </Button>
            </div>
            <Table
              columns={[
                {
                  render: (text, record) => {
                    return <p className={styles.text4}>{record.date}</p>;
                  },
                  title: "Date",
                  width: 150,
                  dataIndex: "date",
                },
                {
                  render: (text, record) => {
                    return (
                      <p className={styles.text2}>{record.treatment}</p>
                    );
                  },
                  title: "Diagnosis and Treatment",
                  width: 400,
                  dataIndex: "treatment",
                },
                {
                  render: (text, record) => {
                    return <p className={styles.text3}>{record.doctor}</p>;
                  },
                  title: "Doctor",
                  width: 150,
                  dataIndex: "doctor",
                },
              ]}
              dataSource={customerDetails.medicalHistory}
              pagination={{ showSizeChanger: true, pageSize: 3, showTotal: true }}
              className={styles.table}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientDetail;