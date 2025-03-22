import Header from "./components/header/Header";

function Home() {
  return (
    <div className="min-h-screen pt-2 bg-background">
      <Header></Header>
      <Content></Content>
    </div>
  );
}

export default Home;

function Content() {
  return (
    <div>
      <h1 className="text-3xl text-white ">MedPred</h1>
    </div>
  );
}
