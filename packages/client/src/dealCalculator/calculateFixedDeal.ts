import { DiscountedProduct, FixedDeal } from "../types";

const calculateFixedDeal = (discountedCart: DiscountedProduct[], deal: FixedDeal):DiscountedProduct[] => {
    const { productId, terms: { price }} = deal;
    return discountedCart.map(product =>
        (
            product.id === productId
            ? {
                ...product,
                discountedPrice: product.discountedPrice < price ? product.discountedPrice : price
            }
            : product
        )
    );
}

export default calculateFixedDeal