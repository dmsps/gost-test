import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import sync from "ol-hashed";
import Map from "ol/Map";
import View from "ol/View";
import GeoJSON from "ol/format/GeoJSON";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import Overlay from "ol/Overlay";
import { OSM, Vector as VectorSource } from "ol/source";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
import { fromLonLat } from "ol/proj";

import MapPopup from "./MapPopup";
import { selectUser } from "../users/usersOperations";

const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export class MapComponent extends Component {
  constructor(props) {
    super();
  }

  updateCurrentUser(id) {
    this.props.handleSelect(id);
  }

  componentDidMount() {
    const geojsonObject = this.props.users.data;

    const styleFunction = function(feature) {
      const image = new CircleStyle({
        radius: 5,
        fill: new Fill({ color: feature.values_.color }),
        stroke: new Stroke({ color: feature.values_.color, width: 2 })
      });

      const styles = {
        Point: new Style({
          image: image
        })
      };

      return styles.Point;
    };

    const LonLatGeoJson = arr => {
      let transformedGeojsonObject = {};
      const { type, ...featuresArray } = geojsonObject;

      featuresArray.features.map(feature => {
        feature.geometry.coordinates = fromLonLat(feature.geometry.coordinates);
        return feature;
      });

      transformedGeojsonObject = { type, ...featuresArray };

      return transformedGeojsonObject;
    };

    const vectorSource = new VectorSource({
      features: new GeoJSON().readFeatures(LonLatGeoJson(geojsonObject))
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: styleFunction
    });

    const popup = new Overlay({
      element: document.getElementById("popup"),
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      }
    });

    const view = new View({
      center: [0, 0],
      zoom: 3
    });

    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        vectorLayer
      ],
      target: "map",
      view: view
    });

    sync(this.map);

    // TODO This in map lstener
    let dirtyProps = this.props;

    this.map.on("singleclick", function(evt) {
      let currentFeature = this.getFeaturesAtPixel(evt.pixel);
      if (currentFeature) {
        let data = dirtyProps.users.data.features[currentFeature[0].id_];

        dirtyProps.handleSelect(currentFeature[0].id_, data);
        popup.setPosition(evt.coordinate);
        this.addOverlay(popup);
        view.animate({
          center: evt.coordinate,
          zoom: 5,
          duration: 666
        });
      }
    });
  }

  render() {
    return (
      <MapWrapper id="map" ref="map">
        <MapPopup selected={this.props.selected} />
      </MapWrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users,
    selected: state.utils.selected
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleSelect: (id, data) => dispatch(selectUser(id, data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapComponent);
