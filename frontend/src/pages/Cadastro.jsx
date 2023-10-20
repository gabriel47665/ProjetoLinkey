import { Button, Col, Form, Input, Row, message } from "antd";
import { rules } from "./constants";
import { api } from "../services/api";
import { Link } from "react-router-dom";

function Cadastro() {
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values) => {
    try {
      const response = await api.post("/usuarios", values);

      console.log(response.data);

      messageApi.open({
        type: "success",
        content: "Usuário cadastrado com sucesso ",
      });
    } catch (error) {
      messageApi.open({
        type: "error",
        content: error.response.data.error,
      });
    }
  };

  return (
    <Form onFinish={onFinish} style={{ width: "80vw", maxWidth: "512px" }}>
      {contextHolder}
      <Row justify={"center"}>
        <Col>
          <h1>Cadastro</h1>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name="email" rules={rules}>
            <Input placeholder="Email" />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item name="nome" rules={rules}>
            <Input placeholder={"Nome"} />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item name="username" rules={rules}>
            <Input placeholder={"Username"} />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item name="senha" rules={rules}>
            <Input.Password placeholder={"Senha"} />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item>
            <Button block={true} type="primary" htmlType="submit">
              Cadastrar
            </Button>
          </Form.Item>
        </Col>
      </Row>

      <Row justify={"center"}>
        <Col>
          <Button type="text">
            <Link to="/login">Deseja fazer login?</Link>{" "}
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default Cadastro;
