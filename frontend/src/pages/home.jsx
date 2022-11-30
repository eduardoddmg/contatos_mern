import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useContact } from '../context';

const Form = () => {
	const { register, handleSubmit } = useForm();
  	const contact = useContact();

  	const onSubmit = async (data) => {
      const result = await contact.register(data);
      console.log(result);
  	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
	        <div>
	          <label>Username</label>
	          <input type="text" {...register('name')} />
	        </div>

	        <div>
	          <label>Email</label>
	          <input type="email" {...register('email')} />
	        </div>
	        <button type="submit">Submit</button>
      	</form>
	)
};

const Table = ({ data }) => {
	return data.map((item, index) => <>
		<p key={index}>
			{item.name}
			<button>editar</button>
			<button>apagar</button>
		</p>

	</>)
}

export const Home = () => {
  const [showForm, setShowForm] = useState(false);
  const contact = useContact();

  return (
    <div className="App">
    	<h1>Home</h1>
    	<button onClick={() => setShowForm(!showForm)}>mostrar</button>
      	{showForm && <Form />}
      	{contact.data && <Table data={contact.data} />}
    </div>
  );
}