import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';

const SignIn: NextPage = () => {
  const needValue = ['Name', 'Email', 'Password'];
  const router = useRouter();

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

  // const inputData =
  return (
    <div className="flex items-center justify-center h-screen overflow-hidden ">
      <form className="p-5 border-gray-400 border w-4/6">
        {needValue.map((value, index) => (
          <div className={`${index > 0 && 'mt-4'}`}>
            <p>{value}</p>
            <input
              type={value.toLowerCase()}
              placeholder={value}
              className="border border-gray-400 px-3 py-[5px] rounded-md w-full"
            />
          </div>
        ))}
        <button className="bg-indigo-500 mt-8 px-5 py-2 rounded font-bold text-lg text-white duration-300 hover:bg-blue-500 focus:outline-none focus:shadow-xl">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignIn;
