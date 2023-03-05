import { useAdmin, useInfo } from "../../context";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Table,   Alert } from '../../components';

export const AdminHome = () => {
  const admin = useAdmin();
  const info = useInfo();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    admin.getUsers();
    setLoading(false);
  }, []);

  console.log(admin.users)

  if (admin.load) return <h1>Está carregando...</h1>

  return (
    <section className="m-5">
      <h1 className="fs-2">Home</h1>
      <Alert />
      {admin.users ? (
        <Table data={admin.users}>
          {admin.users && admin.users.map((item, index) => {
                return (
                  <tr key={index}>
                    {Object.keys(admin.users[0]) && Object.keys(admin.users[0]).map((column, i) => <td key={i}>{item[column]}</td>)}
                    <td>
                      <Button as={Link} to={`/admin/user/${item._id}`}>Acessar</Button>
                    </td>
                  </tr>
                )
              })}
        </Table>
      ) : (
        <h1>Você ainda não tem contatos</h1>
      )}
    </section>
  )
};
