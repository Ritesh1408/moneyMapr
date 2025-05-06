import React, { useEffect, useState } from 'react';
import './styles.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signOut } from 'firebase/auth';
import userImg from '../../assets/userIcon.svg';
import Logo from '../../assets/logo.svg';
import UpdateProfilePhoto from '../UpdateProfile/UpdateProfilePhoto';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";


const Header = () => {
  const [user, loading] = useAuthState(auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);


  useEffect(() => {
    if (loading) return;
    if (user) {
      navigate("/Dashboard");
    } else {
      navigate("/");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      };
      fetchUserData();
    }
  }, [user]);
  

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged out successfully");
        navigate('/');
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className='navbar'>
      <p className='logo'>
        <a style={{ color: "white", textDecorationLine: "none" }} href='/'>
          <img src={Logo} style={{ width: "15px" }} alt="logo" /> MoneyMapr
        </a>
      </p>

      {user && (
        <div style={{ position: "relative", display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <img
            src={user.photoURL ? user.photoURL : userImg}
            alt="user"
            style={{ borderRadius: "50%", height: "2rem", width: "2rem", backgroundColor: "whitesmoke", cursor: "pointer" }}
            onClick={() => setDropdownOpen(prev => !prev)}
          />

          {dropdownOpen && (
            <div style={{
              position: "absolute",
              top: "2.5rem",
              right: 0,
              color: "black",
              backgroundColor: "#fff",
              boxShadow: "var(--shadow)",
              padding: "0.75rem",
              borderRadius: "8px",
              zIndex: 10,
              minWidth: "180px",
              marginTop: "1rem",
            }}>
              <h2 style={{fontSize: "0.8rem"}}>Update Profile</h2>
              <p style={{ marginBottom: "0.5rem" }}>
                {userData?.name || user.displayName || "User"}
              </p>

              <UpdateProfilePhoto />
              <hr style={{ margin: "0.5rem 0" }} />
              <p className="logo link" onClick={handleLogOut}>Logout</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
