import { Button, Result } from "antd";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <Result
      status="404"
      title="404"
      subTitle="Desculpe, está página não foi encontrada"
      extra={
        <Button type="primary">
          <Link to="/cadastro">Voltar para o ínicio</Link>
        </Button>
      }
    />
  );
}

export default NotFound;
