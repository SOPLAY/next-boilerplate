import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  const { data, status } = useSession();
  let text = '';
  console.log(data, status);
  if (status === 'authenticated') text = `${data.user?.name}님 환영합니다.`;
  const loginMenu: TypeNavMenu[] =
    status === 'authenticated'
      ? [
          {
            title: 'Log out',
            href: '#',
          },
        ]
      : [
          { title: 'Sign up', href: '#' },
          {
            title: 'Sign in',
            href: '#',
          },
        ];

  interface TypeNavMenu {
    title: string;
    href: string;
  }
  const navMenu: TypeNavMenu[] = [
    { title: 'Home', href: '#' },
    { title: 'Teg1', href: '#' },
    { title: 'Teg2', href: '#' },
  ];
  return (
    <>
      <nav className="backdrop-blur-3xl flex w-full h-12 px-5 items-center justify-between text-base sticky top-0 ">
        <ul className="flex ">
          {navMenu.map((v, i) => (
            <li key={`NavBar_${i}`} className="mr-5 ">
              <Link href={v.href}>{v.title}</Link>
            </li>
          ))}
        </ul>
        <div>
          <ul className="flex">
            {loginMenu.map((value, index) => (
              <li
                key={`loginMenu${index}`}
                className="ml-5 px-3 py-1 rounded-md hover:bg-yellow-300 hover:text-gray-800 "
              >
                <Link href={value.href}>{value.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
