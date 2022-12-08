import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
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
  Divider
} from "@chakra-ui/react";
import { AddIcon, EditIcon, DeleteIcon, InfoOutlineIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import { Modal, Input, Table } from "../components/chakra";
import { Layout, LoadingComponent } from "../components";
import { configForm } from "../utils";
import { callServer } from "../actions";
import { useParams, Link } from "react-router-dom";

const Form = ({ onClose, item, setItem }) => {
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
      setLoading(true);
      const result = await contact.edit(data, item._id);
      if (result.success) {
        const resp = await contact.get(item._id);
        if (resp.success) setItem(resp.contact);
        onClose();
      }
      setLoading(false);
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

export const Contact = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const contact = useContact();
  const auth = useAuth();

  const params = useParams();

  const edit = (item) => {
    onOpen();
    setData(item);
  };

  useEffect(() => {
    const fetchData = async() => {
      const result = await contact.get(params.contactId);
      console.log(result);
      if (result.success) setData(result.contact);
      else navigate('/');
    }
    fetchData();
    setLoading(false);
  }, []);

  return (
    <Layout>
      {(!loading && data) ? (
        <Box w="full">
          <Box maxW="1800px" px="5%" m="auto" spacing={5} py={10}>
            <Modal
              title="Adicionar contato"
              isOpen={isOpen}
              onOpen={onOpen}
              onClose={onClose}
            >
              <Form onClose={onClose} item={data} setItem={setData} />
            </Modal>
              <Button leftIcon={<ChevronLeftIcon />} my={5} as={Link} to="/">Back</Button><br/>
              <Button leftIcon={<EditIcon />} onClick={() => edit(data)}>Edit</Button>
              {data && <Stack mt={10} spacing={5}>
                  <Text>Nome: {data.name}</Text>
                  <Divider />
                  <Text>Email: {data.email}</Text>
                  <Divider />
                  <Text>CPF: {data.CPF}</Text>
                  <Divider />
                  <Text>RG: {data.RG}</Text>
                  <Divider />
                  <Text>Telefone: {data.tel}</Text>
              </Stack>}
          </Box>
        </Box>
      ) : <LoadingComponent />}
    </Layout>
  );
};
