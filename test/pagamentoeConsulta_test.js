import assert from 'assert';
import ServicoDePagamento from '../src/pagamentoeConsulta.js';

describe('ServicoDePagamento', () => {

  it('Registra pagamento categoria cara', () => {
    const servico = new ServicoDePagamento();

    servico.pagar('1562-3784-9384', 'jujubasVerdes', 150);

    const pagamento = servico.consultarUltimoPagamento();

    assert.strictEqual(pagamento.categoria, 'cara');
  });

  it('Registra pagamento categoria padrão', () => {
    const servico = new ServicoDePagamento();

    servico.pagar('1562-3784-9384', 'jujubasVerdes', 50);

    const pagamento = servico.consultarUltimoPagamento();

    assert.strictEqual(pagamento.categoria, 'padrão');
  });

  it('Retorna só o último pagamento', () => {
    const servico = new ServicoDePagamento();

    servico.pagar('111', 'Empresa A', 50);
    servico.pagar('222', 'Empresa B', 200);

    const pagamento = servico.consultarUltimoPagamento();

    assert.strictEqual(pagamento.codigoBarras, '222');
  });

});