import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import * as Fetch from "../../utils/api";
import { Button } from "react-bootstrap";
import { useAuth } from "../../context";
import { TableAuto } from '../../components'

export const AdminUser = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const response = await Fetch.get(`/admin/user/${params.id}`, auth.token);
      setData(response);
      setLoading(false);
    };

    fetchData();
  }, []);

  console.log(data);

  return !loading ? (
    <section className="m-5">
      <Button onClick={() => navigate(-1)} className="my-3">
        Voltar
      </Button>
      <h1 className="fs-2">Home - {data?.user?.username}</h1>
      {data.contacts ?  (
        <TableAuto data={data.contacts} />
      ) : (
        <h1>Você ainda não tem contatos</h1>
      )}
    </section>
  ) : (
    <h1>Está carregando...</h1>
  );
};
