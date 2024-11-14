import React from "react";
import { Nav, Avatar, Form, Checkbox, Button } from "@douyinfe/semi-ui";
import { IconSemiLogo, IconFeishuLogo, IconHelpCircle, IconBell } from "@douyinfe/semi-icons";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";

const Component = () => {
  const navigate = useNavigate(); // 使用 useNavigate 钩子来进行页面跳转

  const handleLogin = () => {
    // 处理登录逻辑，例如验证用户名和密码
    // 假设验证成功后，跳转到 Home 页面
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
        <div className={styles.login}>
          <div className={styles.component66}>
            <img
              src="https://lf6-static.semi.design/obj/semi-tos/template/99042ce4-7934-4188-b15a-90ea03b3f63d.svg"
              className={styles.logo}
            />
            <div className={styles.header}>
              <p className={styles.title}>欢迎回来</p>
              <p className={styles.text}>
                <span className={styles.text2}>登录</span>
                <span className={styles.text3}> Semi Design </span>
                <span className={styles.text2}>账户</span>
              </p>
            </div>
          </div>
          <div className={styles.form}>
            <Form className={styles.inputs}>
              <Form.Input
                label={{ text: "用户名" }}
                field="input"
                placeholder="输入用户名"
                fieldStyle={{ padding: 0 }}
                style={{ width: 440 }}
                className={styles.formField}
              />
              <Form.Input
                label={{ text: "密码" }}
                field="field1"
                placeholder="输入密码"
                type="password" // 添加 type 为 password，确保输入的密码不会明文显示
                fieldStyle={{ padding: 0 }}
                style={{ width: 440 }}
                className={styles.formField}
              />
            </Form>
            <Checkbox type="default" className={styles.checkbox}>
              记住我
            </Checkbox>
            <Button theme="solid" className={styles.button} onClick={handleLogin}>
              登录
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Component;
