import Container from "@/components/shared/container";
import { Metadata } from "next";
import Breadcrumb from "@/components/shared/breadcrumb";
import CompareList from "@/components/compare/compare-list";

export const metadata: Metadata = {
  title: "Compare page",
};

export default async function Page() {
  return (
    <>
      <Container>
        <div className="py-7 lg:py-8">
          <Breadcrumb />
          <div className="pt-7 lg:pt-8">
            <CompareList />
          </div>
        </div>
      </Container>
    </>
  );
}
