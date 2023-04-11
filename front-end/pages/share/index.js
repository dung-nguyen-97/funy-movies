export default function Share() {
  return (
    <div className="mt-10">
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
          id='url'
          aria-describedby='helper-text-explanation'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        />
        <button
          type='button'
          className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
        >
          Share
        </button>
      </div>
    </div>
  );
}
