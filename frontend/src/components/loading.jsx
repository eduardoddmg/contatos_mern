import { Spinner } from "react-bootstrap";

export const Loading = () => {
  return (
    <section>
      <Spinner animation="border" className="mx-auto my-5" size="lg" />
    </section>
  );
};
