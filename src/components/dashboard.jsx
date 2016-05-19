import React, { Component } from 'react';

class Dashboard extends Component {
  render() {
    const styles = {
      Dashboard: {
        backgroundColor: '#000',
        height: '100%',
        width: '100%'
      }
    }
    return (
      <div className="Dashboard" style={styles.Dashboard}>
        <h1>Hello from React!!</h1>
      </div>
    )
  }
};

export default Dashboard;
