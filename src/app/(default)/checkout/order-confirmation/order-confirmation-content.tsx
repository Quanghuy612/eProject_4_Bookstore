"use client";

import OrderInformation from "@/components/orders/order-information";
import Container from "@/components/shared/container";
import { useCart } from "@/contexts/cart/cartContext";
import { useEffect } from "react";

export default function OrderConfirmationContent() {
  const { resetCart } = useCart();
  useEffect(() => {
    resetCart();
  }, [resetCart]);
  return (
    <Container>
      <OrderInformation />
    </Container>
  );
}
