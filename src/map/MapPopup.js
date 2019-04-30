import React from "react";
import styled from "styled-components";

const MapPopupWrapper = styled.div`
  position: absolute;
  min-width: 200px;
  background-color: white;
  display: flex;
  padding: 20px;
`;

const MapPopupContent = styled.div``;

const MapPopup = props => {
  return (
    <MapPopupWrapper id="popup">
      {props.selected && (
        <MapPopupContent>
          {props.selected.properties.userName}
          <br />
          {props.selected.properties.email}
        </MapPopupContent>
      )}
    </MapPopupWrapper>
  );
};

export default MapPopup;
