import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import send from "../assets/send.svg";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        "service_52z3m9k",
        "template_sa7a2lr",
        {
          from_name: form.name,
          to_name: "Parth Patel",
          from_email: form.email,
          to_email: "parthrp15@gmail.com",
          message: form.message,
        },
        "6bwc7JEUTgSgUzO0d"
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          alert("Ahh, something went wrong. Please try again.");
        }
      );
  };

  return (
    <div className="send-button-frame-wrapper">
      <div className="send-button-frame">
        <p className="sectionSubText">Get in touch</p>
        <b className="contact">Contact</b>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 d-flex flex-column gap-4"
        >
          <label className="your-name-input">
            <span className="name">Your Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="What's your good name?"
              className="your-name-wrapper your-name"
            />
          </label>
          <label className="your-name-input">
            <span className="name">Your email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="What's your web address?"
              className="your-name-wrapper your-name"
            />
          </label>
          <label className="your-name-input">
            <span className="name">Your Message</span>
            <textarea
              rows={7}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What you want to say?"
              className="your-name-wrapper your-name"
            />
          </label>

          <div className="frame7">
            <button type="submit" className="send-button">
              <div className="frame-parent">
                <img className="frame-icon1" alt="" src={send} />
                <div className="send">{loading ? "Sending..." : "Send"}</div>
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
