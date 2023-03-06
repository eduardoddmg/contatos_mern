import {
  Button,
  Form,
  Stack,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useAuth, useInfo } from "../context";
import { Input, Select, Alert } from '../components';
import { schemaAccount } from '../utils';

export const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const auth = useAuth();
  const info = useInfo();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schemaAccount),
  });

  const submit = async (data) => {
    setLoading(true);

    const response = await auth.register(data);
    if (response) navigate("/login");

    setLoading(false);
  };

  return (
    <Stack className="col-md-5 col-10 mx-auto my-5" gap={4}>
      <h1 className="fs-2 text-center">Register</h1>
      <Alert />
      <Form
        className="d-flex flex-column gap-2"
        onSubmit={handleSubmit(submit)}
      >
        <Select {...register("type")} title="Tipo">
          <option value="user">Usuário</option>
          <option value="admin">Administrador</option>
        </Select>
        <Input
          title="Username"
          type="text"
          errors={errors?.username}
          {...register("username")}
        />
        <Input
          title="Password"
          type="password"
          errors={errors?.password}
          {...register("password")}
        />

        <Button
          variant="primary"
          type="submit"
          disabled={loading ? true : false}
        >
          {!loading && "Submit"}
          {loading && <Spinner animation="border" size="sm" />}
        </Button>

        <p className="text-center py-3">
          Já tem uma conta? <Link to="/login">Entrar na conta</Link>
        </p>
      </Form>
    </Stack>
  );
};
