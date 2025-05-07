import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { updateAccount, deleteAccount } from '../../utils/api';
import useAuth from '../../hooks/useAuth';
import '../../styles/settings.css';

function AccountSettings() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: '',
    dateOfBirth: '',
    profilePicture: null,
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, profilePicture: file }));
  };

  const handleUpdateAccount = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await updateAccount(formData, token);
      setSuccess('Account updated successfully!');
      setError('');
    } catch (err) {
      setError('Failed to update account. Please try again.');
      setSuccess('');
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        const token = localStorage.getItem('token');
        await deleteAccount(token);
        logout();
        navigate('/');
      } catch (err) {
        setError('Failed to delete account. Please try again.');
      }
    }
  };
  
  const returnToChats = () => {
	navigate('/chat');
  }

  return (
    <div className="account-settings-page">
      <nav className="navbar">
        <Link to="/chat" className = "logo">Mirth</Link>
        <div><Link to="/chat" className="settings-button">Return to Chats</Link>
        <button onClick={logout} className="logout-button">Logout</button></div>
      </nav>
      <div className="account-settings-container">
        <h1>Account Settings</h1>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <form onSubmit={handleUpdateAccount}>
          <div className="form-row">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-row">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="gender"
              placeholder="Gender"
              value={formData.gender}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-row">
            <input
              type="password"
              name="password"
              placeholder="New Password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm New Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-row">
            <input
              type="text"
              name="dateOfBirth"
              placeholder="Date of Birth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
            />
          </div>
          <div className="profile-picture">
            <label htmlFor="profilePicture">
              <img
                src={
                  formData.profilePicture
                    ? URL.createObjectURL(formData.profilePicture)
                    : 'https://via.placeholder.com/100'
                }
                alt="Profile"
              />
              <span>Upload New Profile Picture</span>
            </label>
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              accept="image/*"
              onChange={handleProfilePictureChange}
            />
          </div>
          <button type="submit" className="btn-update">
            Update Account
          </button>
        </form>

        <button className="btn-delete" onClick={handleDeleteAccount}>
          Delete Account
        </button>
      </div>
	</div>
  );
}

export default AccountSettings;