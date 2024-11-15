import React from "react";
import { useParams } from 'react-router-dom';
import { Nav, Avatar, Tag, Descriptions, Select, TextArea, Button, Table } from '@douyinfe/semi-ui';
import { IconSemiLogo, IconFeishuLogo, IconHelpCircle, IconBell, IconMapPin, IconMail, IconUserCircle } from '@douyinfe/semi-icons';
import styles from './index.module.scss';

const ClientDetail = () => {
  const { id } = useParams(); // 获取客户的 ID
  // 模拟客户详细数据，可以从服务器获取数据
  const customerDetails = {
    id: id,
    name: "Richard Hendricks",
    location: "加拿大",
    email: "richard@gmail.com",
    description: "长期头痛",
    tags: ["新病人", "重点观察", "VIP"],
    contact: {
      appleAccount: "richard@icloud.com",
      googleAccount: "richard@gmail.com",
      instagram: "richard_aaa",
      facebook: "Richard Hendricks"
    },
    medicalHistory: [
      { key: "0", date: "2024-11-01", treatment: "偏头痛，开具药物治疗", doctor: "Dr. Smith" },
      { key: "1", date: "2024-11-08", treatment: "随访，病情好转", doctor: "Dr. Smith" },
      { key: "2", date: "2024-11-15", treatment: "康复检查，一切正常", doctor: "Dr. Johnson" },
    ]
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
              示例
            </Avatar>
          </div>
        }
        className={styles.nav}
      >
        <Nav.Item itemKey="Home" link="/Home" text="首页" />
        <Nav.Item itemKey="Client_detail" link="/client_detail" text="客户详情" />
        <Nav.Item itemKey="Session_details" link="/Session_details" text="病人信息" />
        
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
                示例
              </Avatar>
            </div>
            <div className={styles.name}>
              <p className={styles.richardHendricks}>{customerDetails.name}</p>
              <p className={styles.aRichardHendricks}>{customerDetails.username}</p>
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
                <p className={styles.value4}>病情描述：{customerDetails.description}</p>
              </div>
            </div>
            <div className={styles.tags}>
              {customerDetails.tags.map((tag, index) => (
                <Tag size="large" color={index === 2 ? "orange" : "blue"} className={styles.tag} key={index}>
                  {tag}
                </Tag>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.panel}>
          <div className={styles.frame2}>
            <p className={styles.text}>病人联系信息</p>
            <div className={styles.frame4160}>
              <Descriptions
                data={[
                  { key: "Apple 账号", value: customerDetails.contact.appleAccount },
                  { key: "Google 账号", value: customerDetails.contact.googleAccount },
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
                placeholder="选择病人状态"
                maxTagCount={3}
                className={styles.selectTrigger}
              >
                <Select.Option value="new">新病人</Select.Option>
                <Select.Option value="follow-up">随访</Select.Option>
                <Select.Option value="in-treatment">治疗中</Select.Option>
                <Select.Option value="recovery">康复中</Select.Option>
              </Select>
              <TextArea
                maxCount={100}
                placeholder="备注"
                validateStatus="default"
                className={styles.textArea}
              />
              <Button
                theme="solid"
                icon={<IconFeishuLogo />}
                className={styles.button}
              >
                更新信息
              </Button>
            </div>
            <Table
              columns={[
                {
                  render: (text, record) => {
                    return <p className={styles.text4}>{record.date}</p>;
                  },
                  title: "日期",
                  width: 150,
                  dataIndex: "date",
                },
                {
                  render: (text, record) => {
                    return (
                      <p className={styles.text2}>{record.treatment}</p>
                    );
                  },
                  title: "诊断与治疗",
                  width: 400,
                  dataIndex: "treatment",
                },
                {
                  render: (text, record) => {
                    return <p className={styles.text3}>{record.doctor}</p>;
                  },
                  title: "医生",
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
