import { Stack, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { useAuth, useContact, useInfo } from "../context";
import { api, formatDate } from "../utils";
import { Alert, Table } from '../components';

export const Home = () => {
  const [loading, setLoading] = useState(true);

  const info = useInfo();
  const auth = useAuth();
  const contact = useContact();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const response = await contact.getAll();
      setLoading(false);
    };

    getData();
  }, []);

  const create = () => {
    contact.handleBodyEdit(null);
    navigate("/form/contact");
  };

  const remove = async (event, id) => {
    event.target.disabled = true;
    const response = await contact.remove(id);
    event.target.disabled = false;
  };

  const edit = (data) => {
    contact.handleBodyEdit(data);
    navigate("/form/contact");
  };

  return !loading ? (
    <section>
      <Alert />
      <h1 className="fs-2">Home - {auth.username}</h1>
      <Button className="px-4 my-3" onClick={create}>
        Criar
      </Button>
      {contact.data ? (
        <>
          <Table columns={["código", "nome", "email", "criado", "editado"]} data={contact.data}>
            {contact.data && contact.data.map((item, index) => {
              console.log(item._id);
                  return (
                    <tr key={index}>
                      <td>{item._id}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{formatDate(item.createdAt)}</td>
                      <td>{formatDate(item.updatedAt)}</td>
                      <td>
                        <Button variant="warning" onClick={() => edit(item)}>Editar</Button>
                      </td>
                      <td>
                        <Button variant="danger" onClick={e => remove(e, item._id)}>Apagar</Button>
                      </td>
                    </tr>
                  )
                })}
          </Table>
        </>
      ) : (
        <h1>Você ainda não tem contatos</h1>
      )}
    </section>
  ) : (
    <h1>Está carregando...</h1>
  );
};
