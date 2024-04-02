import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import "./styles/upload.css";
import { UserAuth } from "../context/AuthContext";
import { initializeApp } from "firebase/app";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import Success from "./Success";

const UploadImages = (prop) => {
  const [previewImages, setPreviewImages] = useState([]);
  const [uploadImages, setUploadImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  const [success, setSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { user } = UserAuth();

  useEffect(() => {
    if (imageURLs.length > 0) {
      prop.setRooms((prevRooms) => {
        return [...prevRooms, ...imageURLs];
      });
    }
  }, [success]);

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

    setUploading(true);

    if (uploadImages.length >= 5) {
      for (let i = 0; i < uploadImages.length; i++) {
        const uploadImage = uploadImages[i];
        const fileName = `image_${Date.now()}_${uploadImage.name}`;
        const imageRef = ref(storage, `images/${user.uid}/${fileName}`);

        try {
          await uploadBytes(imageRef, uploadImage);
          const downloadURL = await getDownloadURL(imageRef);
          setImageURLs((prev) => {
            return [...prev, downloadURL];
          });
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }
      setSuccess(true);
    } else {
      alert("Please upload min of 5 images");
    }

    setUploading(false);
  };

  return (
    <section className="upload-section">
      <div
        className="uploading-indicator position-absolute start-50 translate-middle"
        style={{ top: "30%" }}
      >
        {uploading && (
          <div className="custom-spinner">
            <div className="spinner-div"></div>
            <div className="spinner-div"></div>
            <div className="spinner-div"></div>
            <div className="spinner-div"></div>
            <div className="spinner-div"></div>
            <div className="spinner-div"></div>
            <div className="spinner-div"></div>
            <div className="spinner-div"></div>
            <div className="spinner-div"></div>
            <div className="spinner-div"></div>
          </div>
        )}
        <style>
          {`
        .custom-spinner {
          position: absolute;
          width: 9px;
          height: 9px;
        }

        .custom-spinner .spinner-div {
          position: absolute;
          width: 50%;
          height: 150%;
          background: #000000;
          transform: rotate(calc(var(--rotation) * 1deg)) translate(0, calc(var(--translation) * 1%));
          animation: custom-spinner-fzua35 1s calc(var(--delay) * 1s) infinite ease;
        }

        .custom-spinner .spinner-div:nth-child(1) {
          --delay: 0.1;
          --rotation: 36;
          --translation: 150;
        }

        .custom-spinner .spinner-div:nth-child(2) {
          --delay: 0.2;
          --rotation: 72;
          --translation: 150;
        }

        .custom-spinner .spinner-div:nth-child(3) {
          --delay: 0.3;
          --rotation: 108;
          --translation: 150;
        }

        .custom-spinner .spinner-div:nth-child(4) {
          --delay: 0.4;
          --rotation: 144;
          --translation: 150;
        }

        .custom-spinner .spinner-div:nth-child(5) {
          --delay: 0.5;
          --rotation: 180;
          --translation: 150;
        }

        .custom-spinner .spinner-div:nth-child(6) {
          --delay: 0.6;
          --rotation: 216;
          --translation: 150;
        }

        .custom-spinner .spinner-div:nth-child(7) {
          --delay: 0.7;
          --rotation: 252;
          --translation: 150;
        }

        .custom-spinner .spinner-div:nth-child(8) {
          --delay: 0.8;
          --rotation: 288;
          --translation: 150;
        }

        .custom-spinner .spinner-div:nth-child(9) {
          --delay: 0.9;
          --rotation: 324;
          --translation: 150;
        }

        .custom-spinner .spinner-div:nth-child(10) {
          --delay: 1;
          --rotation: 360;
          --translation: 150;
        }

        @keyframes custom-spinner-fzua35 {
          0%, 10%, 20%, 30%, 50%, 60%, 70%, 80%, 90%, 100% {
            transform: rotate(calc(var(--rotation) * 1deg)) translate(0, calc(var(--translation) * 1%));
          }

          50% {
            transform: rotate(calc(var(--rotation) * 1deg)) translate(0, calc(var(--translation) * 1.5%));
          }
        }
      `}
        </style>
      </div>
      {success && (
        <Success msg="Your Images have been successfully uploaded!" />
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
                <img src={image} width="275px" height="309px" alt="upload" />
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
