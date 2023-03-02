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
import { Input, Alert } from '../../components';
import { useAuth, useInfo } from "../../context";
import { schemaAccount } from '../../utils';

export const AdminRegister = () => {
  const [loading, setLoading] = useState(false);

  const auth = useAuth();
  const info = useInfo();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schemaAccount),
  });

  const submit = async (data) => {
    data.type = "admin";
    setLoading(true);

    const response = await auth.register(data);
    if (response) navigate('/admin/login');

    setLoading(false);
  };

  return (
    <Stack className="col-md-5 col-10 mx-auto my-5" gap={4}>
      <h1 className="fs-2 text-center">Register - Admin</h1>
      <Alert />
      <Form
        className="d-flex flex-column gap-2"
        onSubmit={handleSubmit(submit)}
      >
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
          disabled={loading}
        >
          {!loading && "Submit"}
          {loading && <Spinner animation="border" size="sm" />}
        </Button>

        <p className="text-center py-3">
          Já tem uma conta? <Link to="/admin/login">Entrar na conta</Link>
        </p>
      </Form>
    </Stack>
  );
};
