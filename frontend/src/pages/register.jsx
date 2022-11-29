import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
  	alert(JSON.stringify(data));
  };

  return (
    <div className="App">
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