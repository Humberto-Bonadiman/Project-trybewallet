import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeExpenses as deleteExpense } from '../../actions/index';

class ExpenseTable extends Component {
  constructor() {
    super();

    this.buttonDelete = this.buttonDelete.bind(this);
  }

  // Nesta parte eu consultei o repositório do Rodolfo Braga
  // Fonte: https://github.com/tryber/sd-014-b-project-trybewallet/pull/58/commits/181158095530fc1a2eff65c7e61e182f84db0593
  buttonDelete(id) {
    const { removeExpenses } = this.props;
    removeExpenses(id);
  }

  render() {
    const { expenses } = this.props;
    const currencyValue = expenses.map((id) => id.currency);
    return (
      <section className="table-component">
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((number, index) => (
              <tr key={ number.id }>
                <td>{number.description}</td>
                <td>{number.tag}</td>
                <td>{number.method}</td>
                <td>{number.value}</td>
                <td>{number.exchangeRates[currencyValue[index]].name.split('/')[0]}</td>
                <td>
                  {Number(number.exchangeRates[currencyValue[index]].ask).toFixed(2)}
                </td>
                <td>
                  {Number(number.value * number.exchangeRates[
                    currencyValue[index]].ask).toFixed(2)}
                </td>
                <td>Real</td>
                <td>
                  <button
                    data-testid="delete-btn"
                    onClick={ () => this.buttonDelete(number.id) }
                    type="button"
                  >
                    Excluir
                  </button>
                </td>
              </tr>))}
          </tbody>
        </table>
      </section>
    );
  }
}

ExpenseTable.propTypes = {
  expenses: PropTypes.arrayOf().isRequired,
  removeExpenses: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  removeExpenses: (id) => dispatch(deleteExpense(id)),
});

function mapStateToProps(state) {
  return {
    expenses: state.wallet.expenses,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);
