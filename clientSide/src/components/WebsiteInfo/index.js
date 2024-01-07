import React, { useState, useEffect } from 'react';
import './index.css';

const WebsiteInfo = (props) => {
  const { getUserDetails, deletePassword } = props;
  const [userDataDetails, setUserDataDetails] = useState([]);
  const [originalUserData, setOriginalUserData] = useState([]);
  const [searchData, setSearchData] = useState('');
  const [toggleCheck, setToggleCheck] = useState(false);

  useEffect(() => {
    setUserDataDetails([...getUserDetails]);
    setOriginalUserData([...getUserDetails]);
  }, [getUserDetails]);

  const showPassword = () => {
    setToggleCheck(!toggleCheck);
  };

  const searchUserDetails = () => {
    const filteredListUserDetails = originalUserData.filter((i) =>
      i.websiteName.toLowerCase().includes(searchData.toLowerCase())
    );
    setUserDataDetails(filteredListUserDetails);
  };

  useEffect(() => {
    searchUserDetails();
  }, [searchData, originalUserData]);

  const deleteItem = e => {
    deletePassword(e)
  }

  return (
    <div className="app-container-item1">
      <div className="top-section">
        <div className="addCount">
          <h1 className="para">Your Passwords</h1>
          <p className="span">{userDataDetails.length}</p>
        </div>
        <div className="inputBlockSearch">
          <img
            className="inputImage searchImage"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
            alt="search"
          />
          <input
            type="search"
            className="searchInput"
            placeholder="Search"
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
          />
        </div>
      </div>
      <hr />
      <div className="middle-section-section">
        <input
          type="checkbox"
          className="checkBox"
          id="checkId"
          value={toggleCheck}
          onChange={showPassword}
        />
        <label htmlFor="checkId" className="checkLabel">
          Show Passwords
        </label>
      </div>
      <ul className="userList">
        {userDataDetails.map((i) => (
          <li className="user-data" key={i.userId}>
            <div className={`profile ${i.color}`}>
              <p className="profile-name">{i.websiteName[0].toUpperCase()}</p>
            </div>
            <div className="profile-info">
              <p className="website-name">{i.websiteName}</p>
              <p className="user-name">{i.userName}</p>
              {toggleCheck ? (
                <p className="user-name">{i.websitePassword}</p>
              ) : (
                <img
                  className="passwordImage"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                  alt="stars"
                />
              )}
            </div>
            <div className="dlt-button">
              <button type="button" className="dlt-profile" data-testid="delete" onClick={() => {
                      deleteItem(i.userId)
                    }}>
                <img
                  className="dltImage"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                  alt="delete"
                />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WebsiteInfo;
