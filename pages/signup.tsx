import axios from 'axios';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';

const SignUp: NextPage = () => {
  const [fromStatus, setFromStatus] = useState<String>('');
  const needValue = ['Name', 'Email', 'Password'];
  const router = useRouter();
  const nameInputRef = useRef<HTMLInputElement>(null);
  interface TypeInputRef {
    [key: string]: React.RefObject<HTMLInputElement>;
    Name: React.RefObject<HTMLInputElement>;
    Email: React.RefObject<HTMLInputElement>;
    Password: React.RefObject<HTMLInputElement>;
  }
  const inputRef: TypeInputRef = {
    Name: useRef<HTMLInputElement>(null),
    Email: useRef<HTMLInputElement>(null),
    Password: useRef<HTMLInputElement>(null),
  };

  const { data, status } = useSession();
  if (status === 'authenticated') {
    router.replace('/');
    return (
      <div>
        <h1>Sign Up</h1>
        <div>이미 가입된 유저 입니다.</div>
        <div>홈으로 이동합니다</div>
      </div>
    );
  }

  const handleSubmit = async (event: React.SyntheticEvent) => {
    //새로고침 방지
    event.preventDefault();
    const data = {
      name: inputRef.Name.current?.value,
      email: inputRef.Email.current?.value,
      password: inputRef.Password.current?.value,
    };
    console.log(data);
    try {
      await axios
        .post('/api/auth/signup', data)
        .then((res) => {
          setFromStatus(`Sign up Success : ${res.data.message}`);
        })
        .catch((err) => {
          console.log(err.response);
          setFromStatus(`Error Occured : ${err.response.data}`);
          throw new Error(err.response.data.message || '무언가 잘못 됬어요!!!');
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className=" h-screen overflow-hidden w-full">
      <div className="flex flex-col items-center">
        <h1 className="my-20 mt-36 text-5xl font-bold text-gray-700">
          Sign Up
        </h1>
        <form className="p-5 border-gray-400 border w-4/6 ">
          {needValue.map((value, index) => (
            <div
              className={`${index > 0 && 'mt-4'}`}
              key={`needValue_${index}`}
            >
              <p>{value}</p>
              <input
                type={value.toLowerCase()}
                placeholder={value}
                ref={inputRef[value]}
                className="border border-gray-400 px-3 py-[5px] rounded-md w-full focus:outline-red-500"
              />
            </div>
          ))}
          <p className={`mt-3 text-red-500`}>{fromStatus}</p>
          <button
            onClick={(e) => handleSubmit(e)}
            className="bg-indigo-500 mt-5 px-5 py-2 rounded font-bold text-lg text-white duration-300 hover:bg-blue-500 focus:outline-none focus:shadow-xl"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
