import { useState } from "react";
import { Button, Col } from "react-bootstrap";
import ModalComponent from "./ui/ModalComponent";
import { connect } from "react-redux";
import { addProduct } from "../redux/actions/productActions";
import NewProductFormComponent from "./ui/NewProductFormComponent";
import { AiFillPlusCircle } from "react-icons/ai";
import toast from "react-hot-toast";
// import formatDateTime from "../util/formatDateTime";

const initialProductData = {
  name: "",
  sku: "",
  brand: "",
  description: "",
};

const AddProduct = ({ productData, addProduct }) => {
  const [newProduct, setNewProduct] = useState(initialProductData);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAdd = () => {
    setShowAddModal(true);
  };

  const confirmAdd = () => {
    fetch(`http://localhost:3011/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newProduct.name,
        sku: newProduct.sku,
        brand: newProduct.brand,
        description: newProduct.description,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        addProduct(data);
        setShowAddModal(false);
        setNewProduct(initialProductData);
        toast.success("New product successfully added");
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  return (
    <>
      <Col>
        <Button variant="outline-primary" className="pe-none">
          All Products{" "}
          <span className="badge bg-secondary">{productData.length}</span>
        </Button>
      </Col>
      <Col className="text-end">
        <Button variant="primary" onClick={handleAdd}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <AiFillPlusCircle size={20} style={{ marginRight: "5px" }} />
            Add product
          </div>
        </Button>
      </Col>

      {showAddModal && (
        <ModalComponent
          showModal={showAddModal}
          setShowModal={setShowAddModal}
          confirmAction={confirmAdd}
          title="Add new product"
          content={
            <NewProductFormComponent
              newProduct={newProduct}
              setNewProduct={setNewProduct}
            />
          }
          confirmButtonText="Update"
          cancelButtonText="Cancel"
          isConfirmDisabled={
            newProduct.name === "" || newProduct.address === ""
          }
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    productData: state.product.productData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addProduct: (data) => dispatch(addProduct(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
