import { createApp } from "./app";
import { config } from "./config";

createApp().listen(config.port, () => {
  console.log(`expense-claim-api listening on http://localhost:${config.port}`);
  console.log(`payment gateway: ${config.paymentGatewayUrl} (key ${config.paymentGatewayKey})`);
});
