class ServicoDePagamento {

  constructor() {
    this.pagamentos = [];
  }

  pagar(codigoBarras, empresa, valor) {
    this.pagamentos.push({
      codigoBarras,
      empresa,
      valor,
      categoria: valor > 100 ? 'cara' : 'padrão'
    });
  }

  consultarUltimoPagamento() {
    return this.pagamentos[this.pagamentos.length - 1];
  }

}

export default ServicoDePagamento;