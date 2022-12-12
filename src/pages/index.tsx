import { type NextPage } from "next";
import Head from "next/head";
import { type FormEvent, useRef } from "react";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const hello = trpc.short.getAll.useQuery();
  const urlRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent<EventTarget>) => {
    e.preventDefault();

    if (!urlRef || !urlRef.current) return;

    const enteredURL = urlRef.current.value;
    // const temp = trpc.short.addUrl.useQuery(enteredURL);
    console.log(enteredURL);
    const response = await fetch('/api/');
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
        <div className="flex w-full items-center justify-center pt-6 text-2xl text-blue-500">
          {hello.data ? hello.data.map((el,idx) => {
            return <p key={idx}>{el.slug}</p>
          }) : <p>Loading..</p>}
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="enter url">URL:</label>
          <input className="border-gray-50 text-gray-700" type="text" ref={urlRef} />
          <button>Submit</button>
        </form>


      </main>
    </>
  );
};

export default Home;
