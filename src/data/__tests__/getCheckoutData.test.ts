import getCheckoutData from "../getCheckoutData";
import checkoutData from "../checkoutData.json";

describe("getCheckoutData", () => {
  it("returns data held infixture.", async () => {
    const returnedCheckoutData = await getCheckoutData();
    expect(returnedCheckoutData.response).toBe(checkoutData);
  });
  it("returns sucessful response", async () => {
    const checkoutData = await getCheckoutData();
    expect(checkoutData.success).toBe(true);
  });
});
