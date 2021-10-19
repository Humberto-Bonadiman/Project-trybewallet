import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Logo from './logo_trybe.png';
import './Header.css';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <header className="header-component">
        <img className="trybe-logo" src={ Logo } alt="logo-trybe" />
        <article className="article-component">
          <p data-testid="email-field" className="email-header">
            { email }
          </p>
          <p data-testid="total-field" className="total-expense">
            0
          </p>
          <p data-testid="header-currency-field" className="total-expense">
            BRL
          </p>
        </article>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    email: state.user.email,
  };
}

export default connect(mapStateToProps)(Header);
