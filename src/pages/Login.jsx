import { Row, Col, Input, Form, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { LoginRequest } from "../utils/util";
import { getEncrypted } from "../utils/crypto";
import "../style/login.css";

export default function Login() {
  const navigate = useNavigate();

  async function authenticate(email, password) {
    const response = await LoginRequest(email, password);

    const payload = { token: response.token, email };
    const cryptoData = getEncrypted({ payload, permissao: 1 });
    localStorage.setItem("user", cryptoData);
  }

  async function onFinish(values) {
    try {
      await authenticate(values.email, values.password);
      navigate("/home");
    } catch (error) {
      console.log(error);
      message.error("Invalid email or password");
    }
  }

  return (
    <div className="fundoLogin">
      <div className="backgroundImage">
        <img src="../assets/img/Login.png" alt="Login" />
      </div>
      <Row className="linha">
        <Col className="coluna">
          <Form className="col" onFinish={onFinish}>
            <Form.Item className="inEmail" label="Email" name="email">
              <Input />
            </Form.Item>
            <Form.Item className="inSenha" label="Password" name="password">
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="inButton">
                Sign In
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
