import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import './index.css'

const colorList = ['yellow', 'green', 'orange', 'brown', 'blue']
class AddViewPassword extends Component {
  state = {
    isListNonZero: false,
    latestList: [],
    website: '',
    username: '',
    password: '',
    isShowPassword: false,
  }

  renderWebsite = event => {
    this.setState({website: event.target.value})
  }

  renderUsername = event => {
    this.setState({username: event.target.value})
  }

  renderPassword = event => {
    this.setState({password: event.target.value})
  }

  addContent = event => {
    event.preventDefault()
    const {username, website, password} = this.state
    const initial = website[0].toUpperCase()
    const classValue = colorList[Math.floor(Math.random() * colorList.length)]
    const newValues = {
      id: uuidv4(),
      initialValue: initial,
      websiteName: website,
      userName: username,
      Password: password,
      classAdd: classValue,
    }
    this.setState(prevState => ({
      latestList: [...prevState.latestList, newValues],
      website: '',
      username: '',
      password: '',
      isListNonZero: true,
      searchInput: '',
    }))
  }

  showPassword = () => {
    this.setState(prevState => ({isShowPassword: !prevState.isShowPassword}))
  }

  searchList = event => {
    this.setState({searchInput: event.target.value})
  }

  deleteItem = id => {
    const {latestList} = this.state
    const newList = latestList.filter(eachItem => eachItem.id !== id)
    const isListLength = newList.length !== 0
    this.setState({latestList: newList, isListNonZero: isListLength})
  }

  render() {
    const {
      website,
      username,
      password,
      latestList,
      isShowPassword,
      searchInput,
    } = this.state
    let {isListNonZero} = this.state
    const newList = latestList.filter(eachItem =>
      eachItem.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )
    if (newList.length === 0) {
      isListNonZero = false
    } else {
      isListNonZero = true
    }
    return (
      <div className="app-container">
        <div className="content-input-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            className="app-logo"
            alt="app logo"
          />
          <div className="add-password-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              className="mobile-add-pass-img"
              alt="password manager"
            />
            <form className="add-details" onSubmit={this.addContent}>
              <h1 className="heading-text">Add New Password</h1>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  className="input-image"
                  alt="website"
                />
                <input
                  type="text"
                  className="input-element"
                  placeholder="Enter Website"
                  onChange={this.renderWebsite}
                  value={website}
                />
              </div>

              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  className="input-image"
                  alt="username"
                />
                <input
                  type="text"
                  className="input-element"
                  placeholder="Enter Username"
                  onChange={this.renderUsername}
                  value={username}
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  className="input-image"
                  alt="password"
                />
                <input
                  type="password"
                  className="input-element"
                  placeholder="Enter Password"
                  onChange={this.renderPassword}
                  value={password}
                />
              </div>
              <button type="submit" className="add-btn">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              className="desktop-add-password-img"
              alt="password manager"
            />
          </div>
        </div>
        <div className="saved-password-container">
          <div className="password-card">
            <div className="your-password">
              <h1 className="heading-name">Your Passwords</h1>
              <p className="colored-text">{newList.length}</p>
            </div>
            <div className="search-input">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                className="input-image"
                alt="search"
              />
              <input
                type="search"
                className="input-element"
                placeholder="Search"
                onChange={this.searchList}
                value={searchInput}
              />
            </div>
          </div>
          <hr />
          <div className="show-passwords">
            <input
              type="checkbox"
              className="check-box"
              id="check"
              onChange={this.showPassword}
            />
            <label htmlFor="check" className="label-password">
              Show Passwords
            </label>
          </div>
          {!isListNonZero && (
            <div className="empty-state">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                className="empty-image"
                alt="no passwords"
              />
              <p className="no-passwords">No Passwords</p>
            </div>
          )}
          {isListNonZero && (
            <ul className="result-container">
              {newList.map(eachItem => (
                <li className="item-list" id={eachItem.id} key={eachItem.id}>
                  <p className={`initial ${eachItem.classAdd}`}>
                    {eachItem.initialValue}
                  </p>
                  <div className="list-content">
                    <p className="website">{eachItem.websiteName}</p>
                    <p className="website">{eachItem.userName}</p>
                    {!isShowPassword && (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        className="stars-image"
                        alt="stars"
                      />
                    )}
                    {isShowPassword && (
                      <p className="website">{eachItem.Password}</p>
                    )}
                  </div>
                  <button
                    type="button"
                    className="del-btn"
                    onClick={() => this.deleteItem(eachItem.id)}
                    testid="delete"
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      className="del-image"
                      alt="delete"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default AddViewPassword
