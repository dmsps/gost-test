import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";

import UsersList from "../users/UsersList";
import MapComponent from "../map/Map";
import { GlobalStyle } from "./globalStyles";

import { getUsers } from "../users/usersOperations";

const Layout = styled.main`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

const Sidebar = styled.aside`
  width: 100%;
  max-width: 25%;
  display: flex;
  flex-direction: column;
`;

export class App extends Component {
  static propTypes = {
    users: PropTypes.object
  };

  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    const { users } = this.props;
    return (
      <>
        <GlobalStyle />
        <Layout>
          {users.loading ? (
            "Loading"
          ) : (
            <>
              <Sidebar id="sidebar">
                <UsersList />
              </Sidebar>
              {users.data && <MapComponent />}
            </>
          )}
        </Layout>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: () => dispatch(getUsers())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
