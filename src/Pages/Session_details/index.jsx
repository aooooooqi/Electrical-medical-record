import React from "react";
import { Nav, Avatar, Descriptions, Table, Button } from '@douyinfe/semi-ui';
import { IconSemiLogo, IconFeishuLogo, IconHelpCircle, IconBell, IconUserCircle, IconMore, IconSort } from '@douyinfe/semi-icons';
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
        <div className={styles.frame18637}>
          <div className={styles.frame1321314182}>
            <div className={styles.workitemIcon}>
              <IconUserCircle className={styles.semiIconsUserCircle} />
            </div>
            <Descriptions
              data={[{ key: "用户总数量", value: "12,000" }]}
              row={true}
              className={styles.descriptions}
            />
          </div>
          <div className={styles.frame1321314182}>
            <div className={styles.buttonOnlyIconSecond}>
              <IconUserCircle className={styles.semiIconsUserCircle} />
            </div>
            <Descriptions
              data={[{ key: "管理员数量", value: "12,000" }]}
              row={true}
              className={styles.descriptions}
            />
          </div>
          <div className={styles.frame1321314182}>
            <div className={styles.buttonOnlyIconSecond2}>
              <IconUserCircle className={styles.semiIconsUserCircle} />
            </div>
            <Descriptions
              data={[{ key: "活跃用户数量", value: "12,000" }]}
              row={true}
              className={styles.descriptions}
            />
          </div>
        </div>
        <div className={styles.customers}>
          <p className={styles.item}>Customers</p>
          <Table
            columns={[
              {
                title: "标题",
                render: (text, record) => {
                  return (
                    <div className={styles.tD}>
                      <img
                        src="https://lf9-static.semi.design/obj/semi-tos/template/95c73b19-d0b2-41fb-a5a2-36ed9a9136a3.png"
                        className={styles.rectangle3}
                      />
                      <p className={styles.text}>Abstergo Ltd.</p>
                    </div>
                  );
                },
                dataIndex: "title",
              },
              {
                title: "创建日期",
                width: 180,
                render: (text, record) => {
                  return <p className={styles.text2}>12/06/2020</p>;
                },
                sorter: (a, b) => (a?.size - b?.size > 0 ? 1 : -1),
                dataIndex: "createDate",
              },
              {
                title: "创建人",
                width: 176,
                render: (text, record) => {
                  return (
                    <div className={styles.tD2}>
                      <Avatar
                        size="small"
                        src="https://sf6-cdn-tos.douyinstatic.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/avatarDemo.jpeg"
                        color="blue"
                        className={styles.avatar}
                      >
                        示例
                      </Avatar>
                      <p className={styles.text3}>Theresa Webb</p>
                    </div>
                  );
                },
                dataIndex: "creator",
              },
              {
                title: "描述",
                width: 161,
                render: (text, record) => {
                  return <p className={styles.text4}>San Juan</p>;
                },
                dataIndex: "description",
              },
              {
                title: "操作",
                width: 149,
                render: (text, record) => {
                  return (
                    <Button
                      theme="borderless"
                      icon={<IconMore />}
                      className={styles.button}
                    />
                  );
                },
                dataIndex: "operate",
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
            pagination={{ showSizeChanger: true, pageSize: 10, showTotal: true }}
            className={styles.table}
          />
        </div>
      </div>
    </div>
  );
}

export default Component;
