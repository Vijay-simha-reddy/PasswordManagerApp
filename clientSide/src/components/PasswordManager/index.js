import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import WebsiteInfo from '../WebsiteInfo/index';
import Cookie from 'js-cookie';
import { Hourglass } from 'react-loader-spinner';
import './index.css';

const colorsList = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
];

class PasswordManagerUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userLoginId: null,
      websiteName: '',
      userName: '',
      websitePassword: '',
      userDataDetails: '',
      loading: true,
      getUserDetails: null,
      dashBoardStatus:false,
      error6:false,
      error7:false,
      error8:false,
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const userId = params.userId; 
    console.log(userId);
    console.log("shsdgcgcsgg")
    this.setState({ userLoginId: userId }, () => {
      this.getFetchUserDetails();
    });
  }

  websiteInput = (e) => {
    this.setState({ websiteName: e.target.value });
  };

  nameInput = (e) => {
    this.setState({ userName: e.target.value });
  };

  passwordInput = (e) => {
    this.setState({ websitePassword: e.target.value });
  };

  handleBlur7=()=>{
    const {userName} = this.state
    if(userName.trim()===""){
      this.setState({error7:true})
    }
    else{
      this.setState({error7:false})
    }
  }

  handleBlur6=()=>{
    const {websiteName} = this.state
    if(websiteName.trim()===""){
      this.setState({error6:true})
    }
    else{
      this.setState({error6:false})
    }
  }

  handleBlur8=()=>{
    const {websitePassword} = this.state
    if(websitePassword.trim()===""){
      this.setState({error8:true})
    }else{
      this.setState({error8:false})
    }
  }

  addPasswordData = async (event) => {
    event.preventDefault();

    const { userName, websitePassword, websiteName, userLoginId } = this.state;
    if (userName.trim('')!=="" && websiteName.trim('')!=="" && websitePassword.trim('')!==""){

    
    const color = colorsList[Math.floor(Math.random() * colorsList.length)];
    const userDataDetails = { userName, websitePassword, websiteName, color };
    const url = `${window.location.origin}/password/added/${userLoginId}`

    try {
      const options = {
        method: 'POST',
        body: JSON.stringify(userDataDetails),
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await fetch(url, options);
      const data = await response.json();

      if (response.ok) {
        console.log(data);
        this.getFetchUserDetails();
        this.setState({ websiteName: '', websitePassword: '', userName: '' });
      } else {
        console.log(data.error_msg);
      }
    } catch (error) {
      console.error('Error adding password:', error);
    }
  }
  else{
    const {dashBoardStatus}= this.state
     this.setState({dashBoardStatus:!dashBoardStatus})
  }
  };

  onClickLogout = () => {
    Cookie.remove('jwt_token');
    const { history } = this.props;
    history.replace('/');
  };


  getFetchUserDetails = async () => {
    console.log("not-fousdfhgh")
    const { userLoginId } = this.state;
    const apiUrl = `${window.location.origin}/user/${userLoginId}/details`;
    const jwtToken = Cookie.get('jwt_token');

    try {
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      };

      const response = await fetch(apiUrl, options);

      if (response.ok) {
        const fetchedData = await response.json();
        const updatedUserData = fetchedData['userSpecificDetails'].map((i) => ({
          userId: i._id,
          userName: i.userName,
          websiteName: i.websiteName,
          websitePassword: i.websitePassword,
          color: i.color,
        }));
        this.setState({ getUserDetails: updatedUserData , loading:false});
      } else {
        console.error('Failed to fetch user details');
      }
    } catch (error) {
      console.error('Error fetching user details:', error.message);
    }
  };

  deletePassword = async (id) => {
    const { userLoginId } = this.state;
    const apiUrl = `${window.location.origin}/user/${userLoginId}/password/${id}`;
  
    const jwtToken = Cookie.get('jwt_token');
  
    try {
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'DELETE',
      };
  
      const response = await fetch(apiUrl, options);
  
      if (response.ok) {
        console.log('Password deleted successfully');
        this.getFetchUserDetails();
      } else if (response.status === 404) {
        console.error('User or Password not found');
      } else {
        console.error('Failed to delete password');
      }
    } catch (error) {
      console.error('Error deleting password:', error.message);
    }
  };
  

  topsectionRendering = () => {
    const {
      userName,
      websiteName,
      websitePassword,
      userLoginId,
      getUserDetails,
      error6,
      error7,
      error8
    } = this.state;

    return (
      <div className="app-container">
        <div className="navContainer">
          <img
            className="logo"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
          />
          <button type="button" className="logOut" onClick={this.onClickLogout}>
            Logout
          </button>
        </div>
        <div className="app-container-item">
          <img
            className="top-container-image"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
          />

          <div className="formInputs">
            <h1 className="main-heading">Add New Password</h1>
            <div className={`inputBlock ${error6? "non-input":''}`}>
              <img
                className="inputImage"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
              />
              <input
                type="text"
                className="topicInputs"
                placeholder="Enter Website"
                onChange={this.websiteInput}
                value={websiteName}
                onBlur={this.handleBlur6}
              />
            </div>
            <div className={`inputBlock ${error7? "non-input":''}`}>
              <img
                className="inputImage"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
              />
              <input
                type="text"
                className="topicInputs"
                placeholder="Enter Username"
                onChange={this.nameInput}
                value={userName}
                onBlur={this.handleBlur7}
              />
            </div>
            <div className={`inputBlock ${error8? "non-input":''}`}>
              <img
                className="inputImage"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
              />
              <input
                type="password"
                className="topicInputs"
                placeholder="Enter Password"
                onChange={this.passwordInput}
                value={websitePassword}
                onBlur={this.handleBlur8}
              />
            </div>
            <div className="add-button">
              <button
                type="submit"
                className="adding-button"
                onClick={this.addPasswordData}
              >
                Add
              </button>
            </div>
          </div>
          <div className="form-image">
            <img
              className="managerImage"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
            />
          </div>
        </div>
        <WebsiteInfo userLoginId={userLoginId} getUserDetails={getUserDetails} deletePassword={this.deletePassword} />
      </div>
    );
  };

  render() {
    const { loading} = this.state;
    return (
      <>
        {loading ? (
          <div className='spinner-loading'>
          <Hourglass
          visible={true}
          height="80"
          width="80"
          ariaLabel="hourglass-loading"
          wrapperStyle={{}}
          wrapperClass=""
          colors={['#306cce', '#72a1ed']}
          />
          </div>
        ) : (
          this.topsectionRendering()
        )}
      </>
    );
  }
}

export default withRouter(PasswordManagerUser);
