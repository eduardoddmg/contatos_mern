import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context';
import { Form as FormChakra } from '../components/chakra';

export const Register = () => {
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();
  const auth = useAuth();

  const onSubmit = async (data) => {
    await auth.register(data);
  };

  return (
    <div className="App">
      <FormChakra />
    	<h1>Register</h1>
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