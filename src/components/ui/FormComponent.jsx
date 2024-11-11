import { Form } from "react-bootstrap";

export default function FormComponent({ selectedproduct, setselectedproduct }) {
  return (
    <div>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product Name"
            name="name"
            value={selectedproduct.name}
            onChange={(e) =>
              setselectedproduct({ ...selectedproduct, name: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>SKU</Form.Label>
          <Form.Control
            type="sku"
            placeholder="Enter SKU"
            name="sku"
            value={selectedproduct.sku}
            onChange={(e) =>
              setselectedproduct({
                ...selectedproduct,
                sku: e.target.value,
              })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Brand</Form.Label>
          <Form.Control
            type="brand"
            placeholder="Enter Brand"
            name="brand"
            value={selectedproduct.brand}
            onChange={(e) =>
              setselectedproduct({ ...selectedproduct, brand: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Product Description"
            name="description"
            value={selectedproduct.description}
            onChange={(e) =>
              setselectedproduct({
                ...selectedproduct,
                description: e.target.value,
              })
            }
          />
        </Form.Group>
      </Form>
    </div>
  );
}
