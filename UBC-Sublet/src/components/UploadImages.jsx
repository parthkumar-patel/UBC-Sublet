import { useState } from "react";
import { Navigate } from "react-router-dom";
import "./styles/upload.css";
import { UserAuth } from "../context/AuthContext";
import { initializeApp } from "firebase/app";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import Success from "../components/Success";

const UploadImages = (prop) => {
  const [previewImages, setPreviewImages] = useState([]);
  const [uploadImages, setUploadImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  const [success, setSuccess] = useState(false);
  const { user } = UserAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    setUploadImages((previousImages) =>
      previousImages.concat(selectedFilesArray)
    );
    setPreviewImages((previousImages) =>
      previousImages.concat(
        selectedFilesArray.map((file) => URL.createObjectURL(file))
      )
    );

    // FOR BUG IN CHROME
    event.target.value = "";
  };

  function deleteHandler(image) {
    const indexToRemove = previewImages.findIndex((img) => img === image);

    if (indexToRemove !== -1) {
      const updatedPreviewImages = [...previewImages];
      const updatedUploadImages = [...uploadImages];

      updatedPreviewImages.splice(indexToRemove, 1);
      updatedUploadImages.splice(indexToRemove, 1);

      setPreviewImages(updatedPreviewImages);
      setUploadImages(updatedUploadImages);

      URL.revokeObjectURL(image);
    }
  }

  const firebaseConfig = {
    apiKey: "AIzaSyABsui21YwsnUrrzZZMEFc4z_BBINYcCPA",
    authDomain: "ubc-sublet.firebaseapp.com",
    projectId: "ubc-sublet",
    storageBucket: "ubc-sublet.appspot.com",
    messagingSenderId: "744862491087",
    appId: "1:744862491087:web:a44f1fe890494086b772ba",
    measurementId: "G-943F4K57XC",
  };

  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);

  const handleImageChange = async (event) => {
    event.preventDefault();

    if (uploadImages.length > 0) {
      for (let i = 0; i < uploadImages.length; i++) {
        const uploadImage = uploadImages[i];
        const fileName = `image_${Date.now()}_${uploadImage.name}`;
        const imageRef = ref(storage, `images/${user.uid}/${fileName}`);

        try {
          await uploadBytes(imageRef, uploadImage);
          const downloadURL = await getDownloadURL(imageRef);
          setImageURLs((prev) => [...prev, downloadURL]);
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }
      prop.setRooms(imageURLs);
      setSuccess(true);
    } else {
      console.error("No images selected");
    }
  };

  return (
    <section className="upload-section">
      {true ? (
        <Success msg="Your Images have been successfully uploaded!" />
      ) : (
        <></>
      )}
      <label className="upload-label">
        + Add Images
        <br />
        <span className="upload-span">up to 10 images</span>
        <input
          type="file"
          name="images"
          onChange={onSelectFile}
          multiple
          accept="image/png , image/jpeg, image/webp"
          className="upload-input"
        />
      </label>
      <br />

      <input type="file" multiple className="upload-input" />

      {previewImages.length > 0 &&
        (previewImages.length > 10 ? (
          <p className="upload-error">
            You can&apos;t upload more than 10 images! <br />
            <span className="upload-error-span">
              please delete <b> {previewImages.length - 10} </b> of them
            </span>
          </p>
        ) : (
          <button className="upload-btn" onClick={handleImageChange}>
            UPLOAD {previewImages.length} IMAGE
            {previewImages.length === 1 ? "" : "S"}
          </button>
        ))}

      <div className="upload-images">
        {previewImages &&
          previewImages.map((image, index) => {
            return (
              <div key={image} className="upload-image">
                <img src={image} height="200" alt="upload" />
                <button
                  className="close-button"
                  onClick={() => deleteHandler(image)}
                >
                  <span className="X"></span>
                  <span className="Y"></span>
                </button>
                <p className="image-number">{index + 1}</p>
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default UploadImages;
