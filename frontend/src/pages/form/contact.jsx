import { Button, Form, Stack, InputGroup, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth, useContact, useInfo } from "../../context";
import { useState, useMemo } from "react";
import { api, schemaContact } from "../../utils";
import { Input } from '../../components';

export const FormContact = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const contact = useContact();
  const info = useInfo();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schemaContact),
    defaultValues: contact?.bodyEdit
  });

  const show = useMemo(
    () => info?.message?.route === "formContact",
    [info.message]
  );

  const submit = async (data) => {
    const response = contact.bodyEdit ? 
      await contact.edit(data, contact.bodyEdit._id) :
      await contact.create(data);

    if (response) navigate('/');

    contact.handleBodyEdit(null);

    reset();
}
  return (
    <Stack className="col-md-5 col-10 mx-auto my-5" gap={4}>
      <h1 className="fs-2 text-center">
        {contact.bodyEdit ? "Editar contato" : "Criar contato"}
      </h1>
      <Alert
          show={show}
          onClose={info.handleCloseMessage}
          variant={info?.message?.type}
          dismissible
          transition
        >
          {info?.message?.data}
        </Alert>
      <Form
        className="d-flex flex-column gap-2"
        onSubmit={handleSubmit(submit)}
      >
        <Input
          title="Nome"
          type="text"
          errors={errors?.name}
          {...register("name")}
        />
        <Input
          title="Email"
          type="email"
          errors={errors?.email}
          {...register("email")}
        />

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Stack>
  );
};
