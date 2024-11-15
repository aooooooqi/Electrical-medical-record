import React, { useState } from "react";
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { Nav, Avatar, Descriptions, Table, Button, Modal, Form } from '@douyinfe/semi-ui';
import { IconSemiLogo, IconFeishuLogo, IconHelpCircle, IconBell, IconUserCircle, IconMore, IconPlus } from '@douyinfe/semi-icons';
import styles from './index.module.scss';

const Component = () => {
  const navigate = useNavigate();

  // Define state to store customer data and modal visibility
  const [customers, setCustomers] = useState([
    { key: "0", title: "Abstergo Ltd.", createDate: "12/06/2020", description: "San Juan" },
    { key: "1", title: "Umbrella Corp.", createDate: "01/09/2021", description: "Raccoon City" }
  ]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [formApi, setFormApi] = useState(null);

  // Show modal
  const showModal = () => {
    setModalVisible(true);
  };

  // Close modal
  const closeModal = () => {
    setModalVisible(false);
    if (formApi) {
      formApi.reset();
    }
  };

  // Get current date in "MM/DD/YYYY" format
  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${month}/${day}/${year}`;
  };

  // Handle form submission
  const handleSubmit = (values) => {
    const newCustomer = {
      key: (customers.length + 1).toString(),
      title: values.companyName, // Customer name
      createDate: getCurrentDate(), // Set to current date
      description: values.description
    };
    setCustomers([...customers, newCustomer]);
    closeModal();
  };

  // Navigate to customer detail page
  const goToClientDetail = (customerKey) => {
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
              Demo
            </Avatar>
          </div>
        }
        className={styles.nav}
      >
        <Nav.Item itemKey="Home" link="#/Home" text="Home" />
        <Nav.Item itemKey="Session_details" link="#/Clients" text="Client Information" />
      </Nav>
      <div className={styles.content}>
        <div className={styles.header}>
          <Descriptions
            data={[{ key: "Total Users", value: customers.length.toString() }]}
            row={true}
            className={styles.descriptions}
          />
          <Button
            type="primary"
            icon={<IconPlus />}
            onClick={showModal}
            className={styles.addButton}
          >
            Add Customer
          </Button>
        </div>
        <div className={styles.customers}>
          <p className={styles.item}>Customers</p>
          <Table
            columns={[
              {
                title: "Customer Name",
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
                title: "Creation Date",
                width: 180,
                render: (text, record) => {
                  return <p className={styles.text2}>{record.createDate}</p>;
                },
                sorter: (a, b) => (new Date(a.createDate) - new Date(b.createDate)),
                dataIndex: "createDate",
              },
              {
                title: "Description",
                width: 161,
                render: (text, record) => {
                  return <p className={styles.text4}>{record.description}</p>;
                },
                dataIndex: "description",
              },
              {
                title: "Actions",
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

      {/* Add Customer Modal */}
      <Modal
        title="Add Customer"
        visible={isModalVisible}
        onCancel={closeModal}
        onOk={() => formApi.submitForm()}
      >
        <Form
          getFormApi={setFormApi}
          onSubmit={handleSubmit}
        >
          <Form.Input field="companyName" label="Customer Name" placeholder="Enter customer name" required />
          <Form.Input field="description" label="Description" placeholder="Enter description" required />
        </Form>
      </Modal>
    </div>
  );
};

const App = () => {
  return (
    <Component />
  );
};

export default App;