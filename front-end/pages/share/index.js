import { getSession } from 'next-auth/react';
import { useRef } from 'react';
import { toast } from 'react-nextjs-toast';
import { fetchApi } from '../util/fetchData';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Share() {
  const router = useRouter();

  const isLoading = useRef(false);
  const url = useRef('');

  const { data: session } = useSession();

  const onShare = async () => {
    if (isLoading.current || !url.current.value.trim().length) return;
    isLoading.current = true;

    try {
      await fetchApi(`${process.env.API_URL}/movies/share`, {
        method: ['POST'],
        headers: new Headers({
          Authorization: `Bearer ${session?.user?.token}`,
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          url: url.current.value
        })
      });

      toast.notify('Share movies success', {
        duration: 2,
        type: 'success'
      });
      router.push('/');
    } catch (error) {
      toast.notify(String(error.message), {
        duration: 2,
        type: 'error'
      });
    } finally {
      isLoading.current = false;
    }
  };

  return (
    <div className='mt-10'>
      <div className='max-w-md mx-auto flex flex-col gap-2'>
        <p className='tracking-widest text-light md:text-lg dark:text-gray-400'>
          Share a Youtube movie
        </p>
        <label
          htmlFor='url'
          className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
        >
          Youtube URL
        </label>
        <input
          type='text'
          ref={url}
          id='url'
          aria-describedby='helper-text-explanation'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        />
        <button
          type='button'
          onClick={onShare}
          className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
        >
          Share
        </button>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/'
      },
      props: {}
    };
  }
  return {
    props: {}
  };
}
