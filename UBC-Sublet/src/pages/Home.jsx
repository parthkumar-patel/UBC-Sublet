import Search from "../components/Search";
import Card from "../components/Card";
import MeetingCard from "../components/MeetingCard";
import YourCardComponent from "../components/YourCardComponent";

export default function Home() {
	return (
		<div className="">
			{/* <h1 className='text-center text-3xl font-bold py-8'>Home Page</h1> */}
			<Search />
			<Card />
			<MeetingCard />
			<YourCardComponent />
		</div>
	)
}