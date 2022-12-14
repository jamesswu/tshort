import { type NextPage } from "next";
import Head from "next/head";
import { type FormEvent, useRef } from "react";
import { trpc } from "../utils/trpc";
import Link from "next/link";
const Home: NextPage = () => {
  const urlRef = useRef<HTMLInputElement>(null);
  const mutation = trpc.short.addUrl.useMutation();

  const handleSubmit = async (e: FormEvent<EventTarget>) => {
    e.preventDefault();

    if (!urlRef || !urlRef.current) return;

    const enteredURL = urlRef.current.value;
    mutation.mutateAsync(enteredURL); 
  }

  return (
    <>
      <Head>
        <title>Short URL generator</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
        <h1 className="text-5xl font-extrabold leading-normal text-gray-700 md:text-[5rem]">
          Short URL generator
        </h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="enter url">URL:</label>
          <input className="bg-gray-200 shadow-inner rounded-lg px-2 mx-2 text-gray-700" type="text" ref={urlRef} />
          <button 
            className="bg-blue-500 px-2 py-2 text-white rounded-md"
            type="submit">ADD URL</button>
        </form>
        {mutation.isSuccess &&
          <p>
            your shortened URL is: 
              <Link className="text-blue-500 hover:cursor-pointer" href={`${window.location.href}/${mutation.data.slug}`}>
                {window.location.href}/{mutation.data.slug}
              </Link>
          </p>
        }
        {mutation.error && <p>Something went wrong! {mutation.error.message}</p>}


      </main>
    </>
  );
};

export default Home;
