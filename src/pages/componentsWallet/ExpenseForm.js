import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrency } from '../../actions/index';

// import Input from '../../components/Input';
import Select from '../../components/Select';
import './ExpenseForm.css';

const methodPayment = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
// const API = 'https://economia.awesomeapi.com.br/json/all';
class ExpenseForm extends Component {
  constructor() {
    super();
    this.state = {
      valor: '',
      description: '',
      coins: 'USDT',
      paymentMethod: methodPayment[0],
      tag: tags[0],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    const { currencyFetch } = this.props;
    return currencyFetch();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleSelect() {
    const { paymentMethod, tag } = this.state;
    return (
      <>
        <Select
          label="Método de pagamento"
          options={ methodPayment }
          name="paymentMethod"
          onChange={ this.handleChange }
          value={ paymentMethod }
        />
        <Select
          label="Tag"
          options={ tags }
          onChange={ this.handleChange }
          value={ tag }
        />
      </>
    );
  }

  render() {
    const { valor, description, coins } = this.state;
    const { currencies } = this.props;
    const withoutUSDT = currencies.filter((currency) => currency !== 'USDT');
    return (
      <form className="expenseForm">
        <label htmlFor="valor">
          Valor
          <input
            id="valor"
            type="number"
            name="valor"
            value={ valor }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description">
          Descrição
          <input
            id="description"
            type="text"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency">
          Moeda
          <select name={ coins } id="currency">
            { withoutUSDT.map((coin) => (
              <option key={ coin } value={ coin }>
                { coin }
              </option>))}
          </select>
        </label>
        { this.handleSelect() }
      </form>
    );
  }
}

ExpenseForm.propTypes = {
  currencies: PropTypes.arrayOf().isRequired,
  currencyFetch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  currencyFetch: () => dispatch(fetchCurrency()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
