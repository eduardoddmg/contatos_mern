import { useForm } from 'react-hook-form';
import { useAuth } from '../context';
import { useNavigate } from 'react-router-dom';
import { Form as FormChakra } from '../components/chakra';

export const Login = () => {
	const { register, handleSubmit } = useForm();
  const auth = useAuth();
  const navigate = useNavigate();
  	
  	const onSubmit = async (data) => {
    	const result = await auth.login(data);
      console.log(result);
      if (result.success) navigate('/loading');
  	};

  return (
    <div className="App">
      <FormChakra login />
    	<h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Username</label>
          <input type="text" {...register('username')} />
        </div>

        <div>
          <label>Password</label>
          <input type="password" {...register('password')} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}