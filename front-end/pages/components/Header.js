import { useRef } from 'react';
import { toast, ToastContainer } from 'react-nextjs-toast';
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link'
import { fetchApi } from '../util/fetchData';

export default function Header() {
  const isLoading = useRef(false);
  const email = useRef('');
  const password = useRef('');

  const { data: session } = useSession();

  const onLogin = async () => {
    if(isLoading.current) return;

    isLoading.current = true;
    const {ok, error} = await signIn('credentials', {
      email: email.current.value,
      password: password.current.value,
      redirect: false,
      callbackUrl: '/'
    });

    if(ok) {
      toast.notify('Login success', {
        duration: 2,
        type: "success"
      })
    } else {
      toast.notify(error, {
        duration: 2,
        type: "error"
      })
    }
    isLoading.current = false;
    
  };

  const onRegister = async () => {
    if(isLoading.current) return;
    isLoading.current = true;

    try {
      await fetchApi((`${process.env.API_URL}/users/register`))

      toast.notify('Register success, please login', {
        duration: 2,
        type: "success"
      })
    } catch (error) {
      toast.notify(error, {
        duration: 2,
        type: "error"
      })
    } finally {
      isLoading.current = false;
    }
  }

  return (
    <div>
      <ToastContainer />
      <nav className='bg-white border-gray-200 dark:bg-gray-900'>
        <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
          <Link href='/' className='flex items-center'>
            <img
              src='https://flowbite.com/docs/images/logo.svg'
              className='h-8 mr-3'
              alt='Flowbite Logo'
            />
            <span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>
              Funy-Movies
            </span>
          </Link>
          {session && session?.user && (
            <div className='flex items-center justify-between gap-2'>
              <p className='mr-2'>
                Welcome <span className='font-bold'>{session.user?.email}</span>
              </p>
              <Link href='/share'>
              <button
                type='button'
                className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2'
              >
                Share a movie
              </button>
              </Link>
              <button
                type='button'
                onClick={() => signOut()}
                className='text-white bg-white border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 from-purple-600 to-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2'
              >
                Logout
              </button>
            </div>
          )}
          {!session?.user && (
            <div className='items-center justify-between hidden w-full md:flex md:w-auto md:order-1 gap-2'>
              <input
                type='email'
                ref={email}
                className='block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='Email'
              />
              <input
                type='password'
                ref={password}
                className='block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='Password'
              />
              <button
                type='button'
                onClick={onLogin}
                className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2'
              >
                Login
              </button>
              <button
                type='button'
                onClick={onRegister}
                className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2'
              >
                Register
              </button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
