import React, { Component } from "react";
import { connect } from "react-redux";
import { updateItem } from "../../actions/Items";
import PropTypes from "prop-types";

export class Details extends Component {
  state = {
    data: "",
  };

  static propTypes = {
    Items: PropTypes.array.isRequired,
    updateItem: PropTypes.func.isRequired,
  };

  onChange = (e) => {
    this.setState({ data: e.target.value });
  };

  onSubmit = (ID, e) => {
    e.preventDefault();
    const updatedData = { "current_bid": this.state.data };
    console.log(ID);
    console.log(updatedData);
    this.props.updateItem(updatedData, ID);
  };

  render() {
    const { id } = this.props.match.params;

    const selectedItem = this.props.Items.find((x) => x.id.toString() === id);

    return (
      <div className="card mb-3">
        <div className="row no-gutters">
          <div className="col-md-4">
            <img src={selectedItem.picture} className="card-img" alt="..." />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{selectedItem.name}</h5>
              <p className="card-text">
                Current Bid: {selectedItem.current_bid}
              </p>
              <form onSubmit={this.onSubmit.bind(this,id)}>
                <div className="form-group">
                  <input
                    onChange={this.onChange}
                    className="form-control"
                    name="current_bid"
                    type="text"
                    placeholder="Make a bid"
                    value={this.state.data}
                  />
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
              <p className="card-text">
                <small className="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  Items: state.Items.Items,
});

export default connect(mapStateToProps, { updateItem })(Details);
