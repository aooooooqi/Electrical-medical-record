import React from "react";
import { Nav, Avatar, Form, Button, Input, Table } from '@douyinfe/semi-ui';
import { IconSemiLogo, IconFeishuLogo, IconHelpCircle, IconBell, IconSearch, IconMore } from '@douyinfe/semi-icons';
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
      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.userGroup}>
            <p className={styles.meegoSharedWebSettin}>User Group</p>
            <p className={styles.meegoSharedWebSettin2}>
              Set the data range visible to each work item of user group members
            </p>
          </div>
          <div className={styles.basic}>
            <Form className={styles.basic}>
              <div className={styles.frame1321314180}>
                <div className={styles.rectangle1364} />
                <p className={styles.meegoSharedWebSettin3}>Basic</p>
              </div>
              <Form.Input
                label={{ text: "Group Name" }}
                field="input"
                placeholder="Designers"
                fieldStyle={{ padding: 0 }}
                style={{ width: 517 }}
                className={styles.formField}
              />
              <Form.Input
                label={{ text: "Group Alias" }}
                field="field1"
                placeholder="Designers"
                fieldStyle={{ padding: 0 }}
                style={{ width: 517 }}
                className={styles.formField}
              />
            </Form>
            <div className={styles.line231} />
            <div className={styles.frame1321317571}>
              <div className={styles.frame13213141802}>
                <div className={styles.rectangle1364} />
                <p className={styles.meegoSharedWebSettin4}>Advanced</p>
              </div>
              <div className={styles.frame18390}>
                <div className={styles.frame18321}>
                  <p className={styles.meegoSharedWebSettin5}>Delete group</p>
                  <p className={styles.afterDeletingTheUser}>
                    After deleting the user group, the members and data permissions
                    in the group will be cleared.
                  </p>
                </div>
                <Button type="danger" className={styles.button}>
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.left}>
          <div className={styles.frame13213141803}>
            <div className={styles.rectangle1364} />
            <p className={styles.meegoSharedWebSettin6}>Members</p>
          </div>
          <div className={styles.frame18327}>
            <Input
              placeholder="请输入内容"
              prefix={<IconSearch className={styles.semiIconsSearch} />}
              defaultValue="默认值"
              insetLabel={<IconSearch className={styles.semiIconsSearch} />}
              className={styles.input}
            />
            <Table
              columns={[
                {
                  render: (text, record) => {
                    return (
                      <div className={styles.frame1321317570}>
                        <Avatar
                          size="extra-extra-small"
                          src="https://sf6-cdn-tos.douyinstatic.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/avatarDemo.jpeg"
                          color="blue"
                          className={styles.avatar2}
                        >
                          示例
                        </Avatar>
                        <p className={styles.zhangSiyuanUnrevised}>Point Halo</p>
                      </div>
                    );
                  },
                  title: "标题",
                  width: 200,
                  dataIndex: "title",
                },
                {
                  render: (text, record) => {
                    return <p className={styles.text}>Person</p>;
                  },
                  title: "创建日期",
                  width: 80,
                  dataIndex: "createDate",
                },
                {
                  render: (text, record) => {
                    return (
                      <p className={styles.semiTeamBytedanceCom}>
                        semi-team@bytedance.com
                      </p>
                    );
                  },
                  title: "创建人",
                  dataIndex: "creator",
                },
                {
                  render: (text, record) => {
                    return (
                      <Button
                        theme="borderless"
                        icon={<IconMore />}
                        className={styles.button2}
                      />
                    );
                  },
                  title: "",
                  width: 100,
                  dataIndex: "column3",
                },
              ]}
              dataSource={[
                { key: "0" },
                { key: "1" },
                { key: "2" },
                { key: "3" },
                { key: "4" },
                { key: "5" },
                { key: "6" },
                { key: "7" },
                { key: "8" },
                { key: "9" },
              ]}
              pagination={false}
              showHeader={false}
              className={styles.table}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Component;
