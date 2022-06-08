import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useState } from 'react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
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
            href: '/api/auth/signin',
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
  const [menuToggle, setMenuToggle] = useState(false);
  return (
    <>
      <nav className="bg-blue-200 bg-opacity-40 fixed top-0 w-full">
        <div className="">
          <div className="mx-5 backdrop-blur-3xl flex h-12 items-center justify-between text-lg ">
            <ul className="flex ">
              {navMenu.map((v, i) => (
                <li
                  key={`NavBar_${i}`}
                  className={`mr-5  ${i > 0 && 'hidden md:flex '}`}
                >
                  <Link href={v.href}>{v.title}</Link>
                </li>
              ))}
            </ul>
            <div>
              <ul className="hidden md:flex">
                {loginMenu.map((value, index) => (
                  <li
                    key={`loginMenu${index}`}
                    className="ml-5 px-3 py-1 rounded-md hover:bg-yellow-300 hover:text-gray-800 "
                  >
                    <Link href={value.href}>{value.title}</Link>
                  </li>
                ))}
              </ul>
              {/* 모바일 일시 */}
              <div className="md:hidden flex items-center">
                <button onClick={() => setMenuToggle(!menuToggle)}>
                  {!menuToggle ? (
                    <MenuIcon className="w-6 h-6" />
                  ) : (
                    <XIcon className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
          {menuToggle && (
            <ul className="md:hidden ">
              {[
                ...navMenu.filter((value, index) => index > 0),
                ...loginMenu.reverse(),
              ].map((value, index) => (
                <li className="ml-2 py-1 text-base" key={`mobileMenu_${index}`}>
                  <Link href={value.href}>{value.title}</Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
