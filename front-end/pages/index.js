import { fetchApi } from './util/fetchData';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import MovieItem from './components/MovieItem';

export default function Home({ data }) {
  const { data: session } = useSession();
  const [movies, setMovies] = useState([]);

  const getVideoData = async (videoId) => {
    var url = "https://www.googleapis.com/youtube/v3/videos?id=" + videoId + "&key=" + 'AIzaSyBtEz5wubmcC59IOM0mm8YWou8GP-A52Fg' + "&part=snippet,statistics,contentDetails";
    return fetch(url).then(res => res.json()).then(data => {
      const { id, snippet } = data.items[0];
      return {
        videoId: id,
        title: snippet?.title,
        description: snippet?.description,
        thumbnails: snippet?.thumbnails?.default?.url
      }
    });
  }

  const initialData = useCallback(async () => {
    try {
      const data = await fetchApi(`${process.env.API_URL}/movies/list`, {
        method: ['GET'],
        headers: new Headers({
          Authorization: `Bearer ${session?.user?.token}`,
          'Content-Type': 'application/json'
        })
      });

      const movies = await Promise.all(
        data.map(async (movie) => await getVideoData(movie.url))
      )

      setMovies(movies)
    } catch (error) {
      toast.notify(String(error.message), {
        duration: 2,
        type: 'error'
      });
    }
  }, [session]);

  useEffect(() => {
    if (!session) return;
    initialData();
  }, [session]);

  return (
    <div className='mt-5 flex flex-col gap-3'>
      {!!movies.length && movies.map(item => (
        <MovieItem key={item.videoId} data={item} />
      ))}
    </div>
  );
}
