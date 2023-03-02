import { Form } from "react-bootstrap";
import { forwardRef } from "react";

export const Input = forwardRef((props, ref) => {
  const { title, errors, type, ...rest } = props;

  return (
    <Form.Group className="mb-3">
      <Form.Label>{title}</Form.Label>
      <Form.Control
        isInvalid={errors}
        ref={ref}
        type={type}
        placeholder={title + "..."}
        {...rest}
      />
      <Form.Control.Feedback type="invalid">
        {errors?.message}
      </Form.Control.Feedback>
    </Form.Group>
  );
});

export const Checkbox = forwardRef((props, ref) => {
  const { label, type, ...rest } = props;

  return (
    <Form.Group className="mb-3">
      <Form.Check ref={ref} type={type} label={label} {...rest} />
    </Form.Group>
  );
});
