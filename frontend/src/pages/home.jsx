import { useForm } from "react-hook-form";
import { useState } from "react";
import { useContact, useAuth } from "../context";
import {
  Center,
  Heading,
  Button,
  useDisclosure,
  Text,
  Stack,
  Tr,
  Td,
  Box,
  Spinner,
  Skeleton,
} from "@chakra-ui/react";
import { AddIcon, EditIcon, DeleteIcon, InfoOutlineIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { Modal, Input, Table } from "../components/chakra";
import { Layout, LoadingComponent } from "../components";
import { configForm } from "../utils";
import { useNavigate } from 'react-router-dom';

const Form = ({ onClose, item, edit }) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: item?.name,
      email: item?.email,
      CPF: item?.CPF,
      RG: item?.RG,
      tel: item?.tel,
    },
  });
  const contact = useContact();

  const onSubmit = async (data) => {
    if (edit) {
      setLoading(true);
      const result = await contact.edit(data, item._id);
      if (result.success) onClose();
      setLoading(false);
    } else {
      setLoading(true);
      const result = await contact.register(data);
      if (result.success) onClose();
      setLoading(false);
    }
  };

  return (
    <Stack as="form" spacing={5} onSubmit={handleSubmit(onSubmit)}>
      <Input
        title="Nome"
        type="text"
        errors={errors.name}
        {...register("name", configForm.username)}
      />
      <Input title="Email" type="email" errors={errors.email} {...register("email", configForm.email)} />
      <Input title="CPF" type="number" errors={errors.CPF} {...register("CPF", configForm.CPF)} />
      <Input title="RG" type="number" errors={errors.RG} {...register("RG", configForm.RG)} />
      <Input title="Telefone" type="number" errors={errors.tel} {...register("tel", configForm.tel)} />
      <Button isLoading={loading} my={5} colorScheme="purple" type="submit">
        Submit
      </Button>
    </Stack>
  );
};

export const Home = () => {
  const [data, setData] = useState(null);
  const [editForm, setEditForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const contact = useContact();
  const auth = useAuth();

  const navigate = useNavigate();

  const add = () => {
    onOpen();
    setEditForm(false);
    setData(null);
  };

  const edit = (item) => {
    onOpen();
    setEditForm(true);
    setData(item);
  };

  const remove = (id) => {
    setLoading(true);
    contact.remove(id);
    setLoading(false);
  };

  return (
    <Layout>
      {!loading ? (
        <Box w="full">
          <Box maxW="1800px" px="5%" m="auto" spacing={5}>
            <Heading py={5}>Seja bem vindo, {auth.username}</Heading>
            <Button
              mb={5}
              onClick={add}
              leftIcon={<AddIcon />}
              colorScheme="purple"
              variant="solid"
            >
              Adicionar
            </Button>
            <Modal
              title="Adicionar contato"
              isOpen={isOpen}
              onOpen={onOpen}
              onClose={onClose}
            >
              <Form onClose={onClose} item={data} edit={editForm} />
            </Modal>
            {contact.data.length > 0 ? (
              <Table loading={loading} head={["nome", "contato"]}>
                {contact.data.length > 0 &&
                  contact.data.map((item, index) => (
                    <Tr key={index}>
                      <Td>{item.name}</Td>
                      <Td>{item.email}</Td>
                      <Td>
                        <Button bg="transparent" onClick={() => edit(item)}>
                          <EditIcon />
                        </Button>
                        <Button
                          bg="transparent"
                          onClick={() => remove(item._id)}
                        >
                          <DeleteIcon />
                        </Button>
                        <Button
                          bg="transparent"
                          onClick={() => navigate(`/${item._id}`)}
                        >
                          <ExternalLinkIcon />
                        </Button>
                      </Td>
                    </Tr>
                  ))}
              </Table>
            ) : (
              <Center mt="20vh">
                <Heading>Você não tem contatos :'(</Heading>
              </Center>
            )}
          </Box>
        </Box>
      ) : (
        <LoadingComponent />
      )}
    </Layout>
  );
};
