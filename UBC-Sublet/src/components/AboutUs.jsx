// import Side from "../assets/side1.png";
// import Side3 from "../assets/side3.png";
import "./styles/aboutUs.css";

// <img src={Side3} id="image2" style = {{ borderRadius: "70% 30% 70% 30% / 30% 70% 30% 70% ", maxWidth: "50%", maxHeight: "5%" , marginTop: "7%"}} />

export default function AboutUs() {
  return (
    <div>
      <div
        className="AboutUs"
        style={{ marginTop: "12%", justifyContent: "center", height: "140%" }}
      >
        <h2 style={{ marginTop: "4% !important", marginLeft: "41%" }}>
          {" "}
          Our Mission{" "}
        </h2>
        <div
          className="ourMission"
          style={{ marginLeft: "0px", marginTop: "2%", paddingLeft: "20px" }}
        >
          Our mission is to help the students studying at UBC by providing them
          with a seamless solution for finding sublets. We understand the
          challenges and stress that come with searching for temporary housing,
          and our goal is to simplify this process. Through our platform, we aim
          to offer a comprehensive and user-friendly experience, connecting
          students in need of sublets with trustworthy landlords and fellow
          students looking to sublet their spaces. By facilitating this
          connection, we not only make the task of finding sublets easier but
          also contribute to fostering a supportive and inclusive community
          within the UBC student body. Our commitment extends beyond just
          matching tenants with available spaces; we strive to empower students
          with the resources and support they need to navigate the rental market
          with confidence and ease
          <h2 className="STORY2 " style={{ marginTop: "2%" }}>
            {" "}
            How did we come up with this idea?{" "}
          </h2>
          <div className="story2">
            The idea for our subletting platform stemmed from personal
            experience and identified challenges within the process of
            subletting rooms. Initially, we encountered difficulties ourselves
            when trying to sublet a room, which made us realize the broader
            issue at hand. To validate our observations and ensure that our
            solution would address a genuine need, we conducted a survey. The
            positive responses we received from the survey respondents further
            confirmed the demand for a solution in this area. Encouraged by the
            feedback and motivated by our own experiences, we decided to develop
            a platform that would streamline the process of finding sublets for
            students, ultimately leading to the creation of our service.
          </div>
        </div>
      </div>
    </div>
  );
}
