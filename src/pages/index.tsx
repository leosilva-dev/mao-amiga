import type { NextPage } from "next";
import { useEffect } from "react";

const Home: NextPage = () => {
  useEffect(() => {
    document.title = "PomoTask";
  }, []);
  return <h1>Hello World NextJS</h1>;
};

export default Home;
