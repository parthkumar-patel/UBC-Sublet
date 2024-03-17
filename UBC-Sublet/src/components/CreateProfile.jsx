import { useState } from "react";
import { Navigate } from "react-router-dom";
// import { UserAuth } from "../context/AuthContext";
import { Button, Form, Row, Col } from "react-bootstrap";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
} from "firebase/storage";
import { addDoc } from "firebase/firestore";
import "./styles/createProfile.css";

export default function CreateProfile(prop) {
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [formData, setFormData] = useState({
    imageURL: "",
    FirstName: "",
    LastName: "",
    Email: "",
    ContactNo: "",
    uid: "",
  });
  const storage = getStorage();
  //   const { user } = UserAuth();

  if (!prop.user) {
    return <Navigate to="/signin" />;
  }

  function handleAddProfile() {
    console.log(prop.colRef);
    console.log("uid" + prop.user.uid);

    if (image && prop.colRef) {
      const imageRef = ref(storage, `images/${image.name}`);
      const uploadTask = uploadBytesResumable(imageRef, image);

      uploadTask.on("state_changed", () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL);
          addDoc(prop.colRef, {
            imageURL: downloadURL,
            FirstName: formData.FirstName,
            LastName: formData.LastName,
            Email: formData.Email,
            ContactNo: formData.Contact,
            uid: prop.user.uid,
          });
        });
      });
    }
    setImage(null);
    setPreviewImage(null);
    setFormData({
      imageURL: "",
      FirstName: "",
      LastName: "",
      Email: "",
      ContactNo: "",
      uid: "",
    });
  }

  function handleImageChange(event) {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);

    // Create a file preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewImage(e.target.result);
    };
    reader.readAsDataURL(selectedImage);

    handleChange(event);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className="create-profile-container">
      <Form className="create-profile-form">
        <Row className="mb-3">
          <div className="upload-container">
            <label htmlFor="file">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="previewImage"
                />
              ) : (
                "Upload an Image"
              )}
            </label>
            <input
              type="file"
              id="file"
              className="upload-input"
              onChange={handleImageChange}
            />
          </div>
          <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Form.Label>First name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter first name"
              name="FirstName"
              value={formData.FirstName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom02">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter last name"
              name="LastName"
              value={formData.LastName}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
          />
          <Form.Text className="text-muted">
            We&apos;ll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="validationCustom05">
          <Form.Label>Contact Number (Optional)</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter contact number"
            name="Contact"
            value={formData.ContactNo}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" className="px-5" onClick={handleAddProfile}>
          Create Profile
        </Button>
      </Form>
    </div>
  );
}
