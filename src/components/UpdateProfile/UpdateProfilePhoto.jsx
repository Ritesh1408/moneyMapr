import React, { useRef, useState, useEffect } from 'react';
import { updateProfile } from 'firebase/auth';
import { toast } from 'react-toastify';
import userImg from '../../assets/userIcon.svg';
import { auth } from '../../firebase';

const UpdateProfilePhoto = ({ size = "2rem" }) => {
  const fileInputRef = useRef(null);
  const [photoURL, setPhotoURL] = useState(userImg);

  useEffect(() => {
    if (auth.currentUser?.photoURL) {
      setPhotoURL(auth.currentUser.photoURL);
    }
  }, [auth.currentUser]);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const newImageURL = URL.createObjectURL(file);
    setPhotoURL(newImageURL);

    try {
      await updateProfile(auth.currentUser, { photoURL: newImageURL });
      toast.success("Profile photo updated");
    } catch (error) {
      toast.error("Failed to update photo");
      console.error("Error updating profile photo:", error);
    }
  };

  return (
    <>
      <img
        src={photoURL}
        alt="Profile Picture"
        onClick={handleImageClick}
        style={{
          borderRadius: "50%",
          height: size,
          width: size,
          backgroundColor: "whitesmoke",
          cursor: "pointer"
        }}
      />
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
    </>
  );
};

export default UpdateProfilePhoto;
