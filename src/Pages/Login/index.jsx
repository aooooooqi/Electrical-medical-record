import React from "react";
import { Nav, Avatar, Form, Checkbox, Button } from "@douyinfe/semi-ui";
import { IconSemiLogo, IconFeishuLogo, IconHelpCircle, IconBell } from "@douyinfe/semi-icons";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";

const Component = () => {
  const navigate = useNavigate(); // Use useNavigate hook for navigation

  const handleLogin = () => {
    // Handle login logic, such as validating username and password
    // Assuming validation is successful, navigate to the Home page
    navigate("/Home");
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
        <Nav.Item itemKey="Session_details" link="#/Clients" text="Patient Information" />
      </Nav>
      <div className={styles.main}>
        <div className={styles.login}>
          <div className={styles.component66}>
            <img
              src="https://lf6-static.semi.design/obj/semi-tos/template/99042ce4-7934-4188-b15a-90ea03b3f63d.svg"
              className={styles.logo}
            />
            <div className={styles.header}>
              <p className={styles.title}>Welcome Back</p>
              <p className={styles.text}>
                <span className={styles.text2}>Log in</span>
                <span className={styles.text3}> Semi Design </span>
                <span className={styles.text2}>Account</span>
              </p>
            </div>
          </div>
          <div className={styles.form}>
            <Form className={styles.inputs}>
              <Form.Input
                label={{ text: "Username" }}
                field="input"
                placeholder="Enter username"
                fieldStyle={{ padding: 0 }}
                style={{ width: 440 }}
                className={styles.formField}
              />
              <Form.Input
                label={{ text: "Password" }}
                field="field1"
                placeholder="Enter password"
                type="password" // Add type as password to ensure password input is not shown in plain text
                fieldStyle={{ padding: 0 }}
                style={{ width: 440 }}
                className={styles.formField}
              />
            </Form>
            <Checkbox type="default" className={styles.checkbox}>
              Remember me
            </Checkbox>
            <Button theme="solid" className={styles.button} onClick={handleLogin}>
              Log In
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Component;
