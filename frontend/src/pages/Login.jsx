import { Button, Col, Form, Input, Row, message } from "antd";
import { rules } from "./constants";
import { api } from "../services/api";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Login() {
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values) => {
    try {
      const response = await api.post("/login", values);

      console.log(response.data);

      localStorage.setItem("token", response.data.token);

      localStorage.setItem("id", response.data.usuario.id);
      localStorage.setItem("email", response.data.usuario.email);
      localStorage.setItem("nome", response.data.usuario.nome);

      messageApi.open({
        type: "success",
        content: "Usuário encontrado   com sucesso ",
      });
    } catch (error) {
      messageApi.open({
        type: "error",
        content: error.response.data.error,
      });
    }
  };

  return (
    <Form onFinish={onFinish}>
      {contextHolder}
      <Row justify={"center"}>
        <Col>
          <h1>Login</h1>
          {nome}
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name="email" rules={rules}>
            <Input placeholder="Email" />
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
              Entrar
            </Button>
          </Form.Item>
        </Col>
      </Row>

      <Row justify={"center"}>
        <Col>
          <Button type="text">
            <Link to="/cadastro">Deseja criar uma conta?</Link>
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default Login;
