import {
  Button,
  Form,
  Stack,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth, useInfo } from "../../context";
import { useState } from "react";
import { schemaAccount } from '../../utils';
import { Input, Alert } from '../../components';

export const AdminLogin = () => {
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
    data.type = "admin";
    setLoading(true);
    const response = await auth.login(data);
    setLoading(false);
  };

  return (
    <Stack className="col-md-5 col-10 mx-auto my-5" gap={4}>
      <h1 className="fs-2 text-center">Login - Admin</h1>
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

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="Mantenha-me logado"
            {...register("checkbox")}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          disabled={loading ? true : false}
        >
          {!loading && "Submit"}
          {loading && <Spinner animation="border" size="sm" />}
        </Button>

        <p className="text-center py-3">
          Não tem uma conta? <Link to="/admin/register">Criar conta</Link>
        </p>
      </Form>
    </Stack>
  );
};
