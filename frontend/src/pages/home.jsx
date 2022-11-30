import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useContact, useAuth } from '../context';

const Form = ({ setShowForm }) => {
	const { register, handleSubmit } = useForm();
  	const contact = useContact();

  	const onSubmit = async (data) => {
      const result = await contact.register(data);
      if (result.success) setShowForm(false);
  	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
	        <div>
	          <label>Name</label>
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

const FormEdit = ({ item, setShowForm }) => {
	const { register, handleSubmit } = useForm({
		defaultValues: {
			name: item.name,
			email: item.email
		}
	});
  	const contact = useContact();

  	const onSubmit = async (data) => {
      const result = await contact.edit(data, item._id);
      if (result.success) setShowForm(false);
  	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
	        <h1>Edit</h1>
	        <div>
	          <label>Name</label>
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
	const contact = useContact();
	const [showForm, setShowForm] = useState(false);

	const edit = () => {
		setShowForm(true);
	}

	return data.map((item, index) => <>
		<div key={item._id}>
			<p>{item.name}</p>
			<button onClick={edit}>editar</button>
			<button onClick={() => contact.remove(item._id)}>apagar</button>
			{showForm && <FormEdit setShowForm={setShowForm} item={item} />}
		</div>
	</>)
}

export const Home = () => {
  const [showForm, setShowForm] = useState(false);
  const contact = useContact();
  const auth = useAuth();

  return (
    <div className="App">
    	<h1>Seja bem vindo, {auth.username}</h1>
    	<button onClick={() => setShowForm(!showForm)}>mostrar</button>
      	{showForm && <Form setShowForm={setShowForm} />}
      	{contact.data && <Table data={contact.data} setShowForm={setShowForm} />}
    </div>
  );
}