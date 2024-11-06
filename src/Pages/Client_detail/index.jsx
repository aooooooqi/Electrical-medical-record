import React from "react";
import { Nav, Avatar, Tag, Descriptions, Select, TextArea, Button, Table } from '@douyinfe/semi-ui';
import { IconSemiLogo, IconFeishuLogo, IconHelpCircle, IconBell, IconMapPin, IconTiktokLogo, IconMail, IconUserCircle } from '@douyinfe/semi-icons';
import styles from './index.module.scss';

const Component = () => {
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
              <p className={styles.richardHendricks}>Richard Hendricks</p>
              <p className={styles.aRichardHendricks}>@RichardHendricks</p>
            </div>
          </div>
          <div className={styles.main2}>
            <div className={styles.descriptions}>
              <div className={styles.frame4152}>
                <IconMapPin className={styles.semiIconsMapPin} />
                <p className={styles.value}>中国 北京</p>
              </div>
              <div className={styles.frame4152}>
                <IconTiktokLogo className={styles.semiIconsMapPin} />
                <p className={styles.value2}>抖音认证</p>
              </div>
              <div className={styles.frame4154}>
                <IconMail className={styles.semiIconsMapPin} />
                <p className={styles.value3}>richard@gmail.com</p>
              </div>
              <div className={styles.frame4155}>
                <IconUserCircle className={styles.semiIconsMapPin} />
                <p className={styles.value4}>
                  首席吃货，擅长算法，特别是
                  <br />
                  视频压缩算法
                </p>
              </div>
            </div>
            <div className={styles.tags}>
              <Tag size="large" color="blue" className={styles.tag}>
                官方话题
              </Tag>
              <Tag size="large" color="blue" className={styles.tag}>
                商业化
              </Tag>
              <Tag size="large" color="orange" className={styles.tag}>
                大 V
              </Tag>
            </div>
          </div>
        </div>
        <div className={styles.panel}>
          <div className={styles.frame2}>
            <p className={styles.text}>私信管理</p>
            <div className={styles.frame4160}>
              <Descriptions
                data={[
                  { key: "Apple 账号", value: "richard@icloud.com" },
                  { key: "Google 账号", value: "richard@gmail.com" },
                ]}
                align="justify"
                className={styles.descriptions2}
              />
              <Descriptions
                data={[
                  { key: "Instagram", value: "richard_aaa" },
                  { key: "Facebook", value: "Richard Hendricks" },
                ]}
                align="justify"
                className={styles.descriptions2}
              />
            </div>
          </div>
          <div className={styles.components}>
            <div className={styles.inputs}>
              <Select
                placeholder="抖音小助手"
                maxTagCount={3}
                className={styles.selectTrigger}
              >
                <Select.Option value="hotsoon">火山</Select.Option>
                <Select.Option value="douyin">抖音</Select.Option>
                <Select.Option value="pipixia">皮皮虾</Select.Option>
                <Select.Option value="douyinlite">抖音极速版</Select.Option>
                <Select.Option disabled={true} value="duoshan">
                  多闪
                </Select.Option>
                <Select.Option value="toutiao">今日头条</Select.Option>
                <Select.Option value="feishuproject">飞书项目</Select.Option>
                <Select.Option value="xigua">西瓜视频</Select.Option>
              </Select>
              <TextArea
                maxCount={100}
                placeholder="占位文本"
                validateStatus="default"
                className={styles.textArea}
              />
              <Button
                theme="solid"
                icon={<IconFeishuLogo />}
                className={styles.button}
              >
                发送
              </Button>
            </div>
            <Table
              columns={[
                {
                  render: (text, record) => {
                    return (
                      <div className={styles.tD}>
                        <div className={styles.rectangle3}>
                          <img
                            src="https://lf26-static.semi.design/obj/semi-tos/template/e43151ee-6635-4411-accf-0d8df950c400.svg"
                            className={styles.leftIcon}
                          />
                        </div>
                        <p className={styles.text2}>系统通知</p>
                      </div>
                    );
                  },
                  title: "发信人",
                  width: 147,
                  dataIndex: "column0",
                },
                {
                  render: (text, record) => {
                    return (
                      <p className={styles.text3}>
                        #哪吒之魔童降世# 话题活动开讲啦！根据活动规则，恭喜 13 位...
                      </p>
                    );
                  },
                  title: "私信内容",
                  width: 180,
                  dataIndex: "column1",
                },
                {
                  render: (text, record) => {
                    return <p className={styles.text4}>2020-02-02 05:13</p>;
                  },
                  title: "发信时间",
                  width: 192,
                  dataIndex: "column2",
                },
              ]}
              dataSource={[{ key: "0" }, { key: "1" }, { key: "2" }]}
              pagination={{ showSizeChanger: true, pageSize: 3, showTotal: true }}
              className={styles.table}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Component;
