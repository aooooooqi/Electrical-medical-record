import React, { useState } from "react";
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { Nav, Avatar, Descriptions, Table, Button, Modal, Form } from '@douyinfe/semi-ui';
import { IconSemiLogo, IconFeishuLogo, IconHelpCircle, IconBell, IconUserCircle, IconMore, IconPlus } from '@douyinfe/semi-icons';
import styles from './index.module.scss';

const Component = () => {
  const navigate = useNavigate();

  // 定义状态来存储客户数据和模态框可见性
  const [customers, setCustomers] = useState([
    { key: "0", title: "Abstergo Ltd.", createDate: "12/06/2020", description: "San Juan" },
    { key: "1", title: "Umbrella Corp.", createDate: "01/09/2021", description: "Raccoon City" }
  ]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [formApi, setFormApi] = useState(null);

  // 显示模态框
  const showModal = () => {
    setModalVisible(true);
  };

  // 关闭模态框
  const closeModal = () => {
    setModalVisible(false);
    if (formApi) {
      formApi.reset();
    }
  };

  // 获取当前日期并格式化为 "MM/DD/YYYY"
  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = today.getFullYear();
    return `${month}/${day}/${year}`;
  };

  // 处理表单提交
  const handleSubmit = (values) => {
    const newCustomer = {
      key: (customers.length + 1).toString(),
      title: values.companyName, // 客户名字
      createDate: getCurrentDate(), // 设置为当前日期
      description: values.description
    };
    setCustomers([...customers, newCustomer]);
    closeModal();
  };

  // 处理跳转到客户详情页
  const goToClientDetail = (customerKey) => {
    // navigate(`/client_detail/${customerKey}`);
    navigate('/client_detail');
  };

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
        <Nav.Item itemKey="Home" link="/Home" text="首页" />
        <Nav.Item itemKey="Session_details" link="/Clients" text="病人信息" />
      </Nav>
      <div className={styles.content}>
        <div className={styles.header}>
          <Descriptions
            data={[{ key: "用户总数量", value: customers.length.toString() }]}
            row={true}
            className={styles.descriptions}
          />
          <Button
            type="primary"
            icon={<IconPlus />}
            onClick={showModal}
            className={styles.addButton}
          >
            添加客户
          </Button>
        </div>
        <div className={styles.customers}>
          <p className={styles.item}>Customers</p>
          <Table
            columns={[
              {
                title: "客户名字",
                render: (text, record) => {
                  return (
                    <div
                      className={styles.tD}
                      onClick={() => goToClientDetail(record.key)}
                      style={{ cursor: 'pointer' }}
                    >
                      <img
                        src="https://lf9-static.semi.design/obj/semi-tos/template/95c73b19-d0b2-41fb-a5a2-36ed9a9136a3.png"
                        className={styles.rectangle3}
                      />
                      <p className={styles.text}>{record.title}</p>
                    </div>
                  );
                },
                dataIndex: "title",
              },
              {
                title: "创建日期",
                width: 180,
                render: (text, record) => {
                  return <p className={styles.text2}>{record.createDate}</p>;
                },
                sorter: (a, b) => (new Date(a.createDate) - new Date(b.createDate)),
                dataIndex: "createDate",
              },
              {
                title: "描述",
                width: 161,
                render: (text, record) => {
                  return <p className={styles.text4}>{record.description}</p>;
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
            dataSource={customers}
            pagination={{ showSizeChanger: true, pageSize: 10, showTotal: true }}
            className={styles.table}
          />
        </div>
      </div>

      {/* 添加客户的模态框 */}
      <Modal
        title="添加客户"
        visible={isModalVisible}
        onCancel={closeModal}
        onOk={() => formApi.submitForm()}
      >
        <Form
          getFormApi={setFormApi}
          onSubmit={handleSubmit}
        >
          <Form.Input field="companyName" label="客户名字" placeholder="请输入客户名字" required />
          <Form.Input field="description" label="描述" placeholder="请输入描述" required />
        </Form>
      </Modal>
    </div>
  );
};

// 客户详细页面组件
// const ClientDetail = () => {
//   const { id } = useParams(); // 使用 useParams 获取客户 ID
//   return (
//     <div>
//       <h2>客户详情 - ID: {id}</h2>
//       {/* 在这里可以添加更多客户详细信息 */}
//     </div>
//   );
// };

const App = () => {
  return (
    // <Routes>
    //   <Route path="/" element={<Component />} />
    //   <Route path="/client_detail/:id" element={<ClientDetail />} />
    // </Routes>
    <Component />
  );
};

export default App;
