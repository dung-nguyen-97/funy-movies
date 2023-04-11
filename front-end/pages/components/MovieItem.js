export default function MovieItem({ data }) {
  const { title, description, thumbnails, videoId } = data;

  return (
    <div className='mx-auto max-w-4xl'>
      <a
        href={`https://www.youtube.com/watch?v=${videoId}`}
        target='_blank'
        className='flex flex-col px-2 items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-4xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'
      >
        <img
          className='shrink-0 object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-l-lg'
          src={thumbnails}
        />
        <div className='flex flex-col justify-between p-4 leading-normal'>
          <h5 className='mb-2 text-2xl font-bold tracking-tight text-red-700'>
            {title}
          </h5>
          <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
            Share by: dev
          </p>
          <p className='text-ellipsis overflow-hidden truncate-overflow mb-3 font-normal text-gray-700 dark:text-gray-400 break-all whitespace-break-spaces'>
            Description: {description}
          </p>
        </div>
      </a>
    </div>
  );
}
