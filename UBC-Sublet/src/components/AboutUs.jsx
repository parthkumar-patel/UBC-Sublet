import Side from "../assets/side1.png";
import Side3 from "../assets/side3.png";
import "./styles/aboutUs.css"


export default function AboutUs() {
    return (
        <div>
        <div className="AboutUs" style = {{ marginTop : "10%", marginLeft: "5%" }}>
            <div className="pics"> 
                <img src= {Side}  id = "image1" style = {{ borderRadius: "30% 70% 30% 70% / 70% 30% 70% 30% ", maxWidth: "50%", maxHeight: "5%", marginTop: "7%"}} />
                <img src={Side3} id="image2" style = {{ borderRadius: "70% 30% 70% 30% / 30% 70% 30% 70% ", maxWidth: "50%", maxHeight: "5%" , marginTop: "7%"}} />
            </div>
            <div className="description">
               <h2 style = {{ marginLeft: "40%" }}> Our Mission </h2>
               <div className="ourMission">
                    Our mission is to help the students studying at UBC by providing them with a seamless solution for finding sublets. We understand the challenges and stress that come with searching for temporary housing, and our goal is to simplify this process. Through our platform, we aim to offer a comprehensive and user-friendly experience, connecting students in need of sublets with trustworthy landlords and fellow students looking to sublet their spaces. By facilitating this connection, we not only make the task of finding sublets easier but also contribute to fostering a supportive and inclusive community within the UBC student body. Our commitment extends beyond just matching tenants with available spaces; we strive to empower students with the resources and support they need to navigate the rental market with confidence and ease
                </div>
            </div>
        </div>
        <div className="STORY">
            <h2> How did we come up with this idea? </h2>
            <div id = "ourSTORY">
            The idea for our subletting platform stemmed from personal experience and identified challenges within the process of subletting rooms. Initially, we encountered difficulties ourselves when trying to sublet a room, which made us realize the broader issue at hand. To validate our observations and ensure that our solution would address a genuine need, we conducted a survey. The positive responses we received from the survey respondents further confirmed the demand for a solution in this area. Encouraged by the feedback and motivated by our own experiences, we decided to develop a platform that would streamline the process of finding sublets for students, ultimately leading to the creation of our service.
            </div>
        </div>
    </div>
    )
}