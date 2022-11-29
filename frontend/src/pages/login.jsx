import { useForm } from 'react-hook-form';

export const Login = () => {
	const { register, handleSubmit } = useForm();
  	
  	const onSubmit = (data) => {
    	alert(JSON.stringify(data));
  	};

  return (
    <div className="App">
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