import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";

import User from "./UsersItem";

const List = styled.ul`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
  overflow-y: scroll;
`;

export class UsersList extends Component {
  static propTypes = {
    users: PropTypes.object
  };

  constructor(props) {
    super();
  }

  render() {
    const { users, selected } = this.props;

    return (
      <List>
        {!users.loading &&
          users.data &&
          users.data.features.map(user => (
            <User
              key={user.id}
              user={user}
              selected={selected && selected.id === user.id}
            />
          ))}
      </List>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
  selected: state.utils.selected
});

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersList);
