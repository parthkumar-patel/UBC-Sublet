import Search from "../components/Search";
// import Card from "../components/Card";
// import MeetingCard from "../components/MeetingCard";
import YourCardComponent from "../components/YourCardComponent";

export default function Home() {
	return (
		<div className="text-center">
			<Search />
			{/* <Card /> */}
			{/* <MeetingCard /> */}
			<YourCardComponent />
		</div>
	)
}