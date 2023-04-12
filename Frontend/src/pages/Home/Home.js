import React from "react";
import Header from "../../components/Header/Header";
import SearchForm from "../../components/SearchForm/SearchForm";
import "./Home.scss";

function Home() {
  return (
    <>
      <Header />
      <main>
        <SearchForm></SearchForm>
      </main>
    </>
  );
}

export default Home;
