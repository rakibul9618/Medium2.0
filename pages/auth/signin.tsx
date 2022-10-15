import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import InputField from '../../components/auth/InputField';
import Container from '../../components/Container';
import Link from 'next/link';
import { ServerError } from '@sanity/client';

// icons
import { HiOutlineMail } from 'react-icons/hi';
import { AiOutlineLock } from 'react-icons/ai';
// images
import smile from '../../public/images/icon.svg';

interface FormDataType {
  email: string;
  password: string;
}

const data = {
  email: '',
  password: '',
};

const SignIn: NextPage = () => {
  const [formData, setFormData] = useState<FormDataType>({ ...data });

  const [error, setError] = useState<FormDataType>({ ...data });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let getError: FormDataType = { ...data };
    let mailValidate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let passwordValidate =
      formData.password.length < 8 || formData.password.length > 30;
    if (!formData.email.match(mailValidate)) {
      getError.email = 'Please enter a valid email';
    }
    if (passwordValidate) {
      getError.password = 'Please enter 8 or more character';
    }
    setError(getError);
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const list: FormDataType = { ...formData };
    list[name as keyof FormDataType] = value;
    setFormData(list);
  };
  useEffect(() => {
    let mailValidate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let passwordValidate = formData.password.length > 7;
    let getError: FormDataType = { ...error };
    if (error.email && formData.email.match(mailValidate)) {
      getError.email = '';
    }
    if (error.password && passwordValidate) {
      getError.password = '';
    }
    setError(getError);
  }, [formData]);

  return (
    <Container
      className="flex flex-col items-center justify-center"
      parentClass="bg-sign_in_bg min-h-screen bg-gray-200"
    >
      <div className="w-full max-w-450px bg-white px-5 pt-6 pb-8 rounded-xl">
        <form className="" onSubmit={handleSubmit} noValidate={true}>
          <div className="icon_holder w-16 mx-auto">
            <img className="w-full" src={smile.src} alt="smile" />
          </div>
          <InputField
            title="Email"
            name="email"
            type="email"
            Icon={HiOutlineMail}
            value={formData.email}
            onChange={onChangeHandler}
            error={error.email}
          />
          <InputField
            title="Password"
            name="password"
            type="password"
            Icon={AiOutlineLock}
            value={formData.password}
            onChange={onChangeHandler}
            error={error.password}
          />
          <button
            className="px-10 py-1 bg-yellow-300 active:bg-yellow-200 mt-6 mx-auto w-full block rounded-md"
            type="submit"
          >
            Sign In
          </button>
        </form>
        <p className='mt-3'>
          Don't have account?{' '}
          <Link href="/auth/singup">
            <a className="text-yellow-500 hover:underline">Create one</a>
          </Link>
        </p>
      </div>
    </Container>
  );
};

export default SignIn;
