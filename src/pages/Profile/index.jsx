import './styles.scss';

const Profile = () => {
  const handleDeleteCredentials = () => {
    localStorage.clear();
  };

  return (
    <div className='profile'>
      <h3>Profile</h3>
      <button
            className='profile-button_logOut'
            type='submit'
            value='submit'
            onClick={handleDeleteCredentials}
          >
            Log Out
          </button>
    </div>
  );
};

export default Profile;
