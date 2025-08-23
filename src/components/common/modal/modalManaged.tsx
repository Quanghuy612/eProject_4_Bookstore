"use client";

import Modal from "@/components/common/modal/modal";
import dynamic from "next/dynamic";
import {
  useModalAction,
  useModalState,
} from "@/components/common/modal/modalContext";

const ForgetPasswordForm = dynamic(
  () => import("@/components/account/forget-password-form"),
);
const ProductQuickview = dynamic(
  () => import("@/components/product/product-quickview"),
);
const ProductVideo = dynamic(
  () => import("@/components/product/product-details/product-video"),
);
export default function ModalManaged() {
  const { isOpen, view } = useModalState();
  const { closeModal } = useModalAction();

  return (
    <Modal open={isOpen} onClose={closeModal}>
      {view === "FORGET_PASSWORD" && <ForgetPasswordForm />}
      {view === "PRODUCT_VIEW" && <ProductQuickview />}
      {view === "PRODUCT_VIDEO" && <ProductVideo />}
    </Modal>
  );
}
