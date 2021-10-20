import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrency, receiveExpenses } from '../../actions/index';

// import Input from '../../components/Input';
import Select from '../../components/Select';
import Button from '../../components/Button';
import './ExpenseForm.css';

const methodPayment = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const categories = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
class ExpenseForm extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: methodPayment[0],
      tag: categories[0],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.onClickSubmit = this.onClickSubmit.bind(this);
    this.inicialState = this.inicialState.bind(this);
  }

  componentDidMount() {
    const { currencyFetch } = this.props;
    return currencyFetch();
  }

  // Nesta parte eu consultei o repositório do Luiz Gustavo
  // Fonte: https://github.com/tryber/sd-014-b-project-trybewallet/pull/32/commits/1177635a8cbc401cf6c30ae794a2106271a3fb09
  onClickSubmit() {
    const { saveWalletExpenses, allCurrencies, currencyFetch } = this.props;
    currencyFetch();
    saveWalletExpenses({ ...this.state, exchangeRates: allCurrencies });
    this.inicialState();
  }

  inicialState() {
    this.setState((prevState) => ({
      id: prevState.id + 1,
      value: '',
      description: '',
      currency: 'USD',
      method: methodPayment[0],
      tag: categories[0],
    }));
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleSelect() {
    const { currency, method, tag } = this.state;
    const { currencies } = this.props;
    return (
      <>
        <Select
          label="Moeda"
          options={ currencies.filter((coin) => coin !== 'USDT') }
          name="currency"
          onChange={ this.handleChange }
          value={ currency }
        />
        <Select
          label="Método de pagamento"
          options={ methodPayment }
          name="method"
          onChange={ this.handleChange }
          value={ method }
        />
        <Select
          label="Tag"
          options={ categories }
          name="tag"
          onChange={ this.handleChange }
          value={ tag }
        />
      </>
    );
  }

  render() {
    const { value, description } = this.state;
    return (
      <form className="expenseForm">
        <label htmlFor="value">
          Valor
          <input
            id="value"
            type="number"
            name="value"
            value={ value }
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
        { this.handleSelect() }
        <Button
          onClick={ this.onClickSubmit }
          disabled={ false }
          label="Adicionar despesa"
        />
      </form>
    );
  }
}

ExpenseForm.propTypes = {
  currencies: PropTypes.arrayOf().isRequired,
  currencyFetch: PropTypes.func.isRequired,
  saveWalletExpenses: PropTypes.func.isRequired,
  // expenses: PropTypes.objectOf(PropTypes.object).isRequired,
  allCurrencies: PropTypes.objectOf().isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  allCurrencies: state.wallet.allCurrencies,
});

const mapDispatchToProps = (dispatch) => ({
  currencyFetch: () => dispatch(fetchCurrency()),
  saveWalletExpenses: (data) => dispatch(receiveExpenses(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
