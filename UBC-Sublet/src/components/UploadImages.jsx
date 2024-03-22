import { useState } from "react";
import "./styles/upload.css";
import { initializeApp } from "firebase/app";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
} from "firebase/storage";

const UploadImages = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setSelectedImages(imagesArray);

    // FOR BUG IN CHROME
    event.target.value = "";
  };

  function deleteHandler(image) {
    setSelectedImages(selectedImages.filter((e) => e !== image));
    URL.revokeObjectURL(image);
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

  const handleImageChange = (event) => {
    event.preventDefault();
    if (selectedImages && selectedImages.length > 0) {
      //   const images = [];

      for (let i = 0; i < selectedImages.length; i++) {
        const selectedImage = selectedImages[i];
        const fileName = `image_${Date.now()}_${selectedImage.name}`;
        const imageRef = ref(storage, `images/${fileName}.jpg`);
        const uploadTask = uploadBytesResumable(imageRef, selectedImage);

        console.log(getDownloadURL(imageRef));
        uploadTask.on(
          storage.TaskEvent,
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
            switch (snapshot.state) {
              case storage.TaskState.PAUSED:
                console.log("Upload is paused");
                break;
              case storage.TaskState.RUNNING:
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            console.error("Error uploading image:", error);
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              //   images.push(downloadURL);
              setImageURLs([...imageURLs, downloadURL]); // Update state with new URL
            } catch (error) {
              console.error("Error getting download URL:", error);
            }
          }
        );
      }
      //   setImageURLs(images);
    } else {
      console.error("No images selected");
    }
  };

  return (
    <section className="upload-section">
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

      {selectedImages.length > 0 &&
        (selectedImages.length > 10 ? (
          <p className="upload-error">
            You can&apos;t upload more than 10 images! <br />
            <span className="upload-error-span">
              please delete <b> {selectedImages.length - 10} </b> of them{" "}
            </span>
          </p>
        ) : (
          <button className="upload-btn" onClick={handleImageChange}>
            UPLOAD {selectedImages.length} IMAGE
            {selectedImages.length === 1 ? "" : "S"}
          </button>
        ))}

      <div className="upload-images">
        {selectedImages &&
          selectedImages.map((image, index) => {
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
      {console.log(imageURLs)}
    </section>
  );
};

export default UploadImages;
