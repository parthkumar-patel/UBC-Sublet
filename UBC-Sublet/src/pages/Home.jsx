// import Search from "../components/Search";
import SearchNew from "../components/SearchNew";
import Card from "../components/Card";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="text-center">
      {/* <Search /> */}
      <SearchNew />
      <Card />
      <Footer />
    </div>
  );
}
