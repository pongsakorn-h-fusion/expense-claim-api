export const config = {
  port: Number(process.env.PORT ?? 3000),
  paymentGatewayUrl: process.env.PAYMENT_GATEWAY_URL ?? "https://payments.example.test",
  paymentGatewayKey: process.env.PAYMENT_GATEWAY_KEY ?? "FAKE-LAB-KEY-7f3a9c21-not-a-real-secret",
};
