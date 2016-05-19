import React, { Component } from 'react';

class Dashboard extends Component {
  render() {
    const styles = {
      Dashboard: {
        backgroundColor: '#1C272C',
        height: '100%',
      },
      square: {
        backgroundColor: '#D8CA41'
      }
    }
    return (
      <div className="Dashboard" style={styles.Dashboard}>
        <div className="square" style={styles.square}></div>
      </div>
    )
  }
};

export default Dashboard;
