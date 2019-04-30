import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { selectUser } from "./usersOperations";

const Avatar = styled.img`
  display: flex;
  width: 50px;
  height: 50px;
  object-fit: contain;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid transparent;
`;

const User = styled.li`
  display: flex;
  align-items: center;
  max-width: 100%;
  padding: 20px;
  cursor: pointer;
  border-top: 2px solid ${p => (p.selected ? p.color : "transparent")};
  border-bottom: 2px solid ${p => (p.selected ? p.color : "transparent")};

  ${Avatar} {
    border-color: ${p => (p.selected ? p.color : "transparent")};
  }
`;

const Info = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 10px;
`;

const Name = styled.span`
  font-size: 20px;
`;

const Email = styled.span`
  color: gray;
`;

export class UserItem extends Component {
  constructor(props) {
    super();
    this.currentUserSelected = React.createRef();
  }

  handleClick(id) {
    this.props.handleSelect(id, this.props.user);
  }

  componentDidUpdate() {
    if (this.props.selected) {
      this.currentUserSelected.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  render() {
    const { user, selected } = this.props;

    return (
      <User
        {...this.props}
        onClick={() => this.handleClick(user.id)}
        color={user.properties.color}
        ref={selected && this.currentUserSelected}
      >
        <Avatar src={user.properties.avatar} alt="" />
        <Info>
          <Name>{user.properties.userName}</Name>
          <Email>{user.properties.email}</Email>
        </Info>
      </User>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
  return {
    handleSelect: (id, data) => dispatch(selectUser(id, data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserItem);
