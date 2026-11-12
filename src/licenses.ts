/** Dados transcritos dos comprovantes enviados pelo cliente em 12/11/2026. */
export const licenses = [
  {
    id: "exercito",
    authority: "Exército Brasileiro",
    document: "Certificado de Registro",
    validityLabel: "Validade: 14/08/2028",
    periodStart: "2026-08-13",
    periodEnd: "2028-08-14",
  },
  {
    id: "policia-federal",
    authority: "Polícia Federal",
    document: "Licença de Funcionamento — CLF",
    validityLabel: "Validade: 12/06/2027",
    periodStart: "2026-04-22",
    periodEnd: "2027-06-12",
  },
  {
    id: "policia-civil-alvara",
    authority: "Polícia Civil de São Paulo",
    document: "Alvará para Produtos Químicos Controlados",
    validityLabel: "Exercício: 2026",
    periodStart: "2026-10-08",
    periodEnd: "2026-12-31",
  },
  {
    id: "policia-civil-vistoria",
    authority: "Polícia Civil de São Paulo",
    document: "Certificado de Vistoria",
    validityLabel: "Triênio: 2026 a 2028",
    periodStart: "2026-10-08",
    periodEnd: "2028-12-31",
  },
  {
    id: "bombeiros",
    authority: "Corpo de Bombeiros de São Paulo",
    document: "Certificado de Licença — CLCB",
    validityLabel: "Validade: 30/04/2029",
    periodStart: "2026-04-30",
    periodEnd: "2029-04-30",
  },
];

/** Após o período exibido, evita continuar anunciando que toda a documentação está em dia. */
export function documentationIsCurrent(today = new Date()) {
  const date = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(today);
  return licenses.every(
    (license) => date >= license.periodStart && date <= license.periodEnd,
  );
}
