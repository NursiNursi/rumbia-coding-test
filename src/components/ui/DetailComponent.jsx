import { Form } from "react-bootstrap";

export default function DetailComponent({ selectedproduct }) {
  return (
    <div>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="name"
            name="name"
            value={selectedproduct.name}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>SKU</Form.Label>
          <Form.Control
            type="text"
            placeholder="sku"
            name="sku"
            value={selectedproduct.sku}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Brand</Form.Label>
          <Form.Control
            type="text"
            placeholder="brand"
            name="brand"
            value={selectedproduct.brand}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="description"
            name="description"
            value={selectedproduct.description}
          />
        </Form.Group>
      </Form>
    </div>
  );
}
