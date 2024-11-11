import { useEffect, useState } from "react";
import {
  deleteProduct,
  fetchAllProducts,
  updateProduct,
} from "../redux/actions/productActions";
import { connect } from "react-redux";

import {
  Button,
  Col,
  Container,
  Placeholder,
  Row,
  Table,
} from "react-bootstrap";
import { AiFillDelete, AiFillEdit, AiOutlineEye } from "react-icons/ai";

import AddProduct from "./AddProduct";
import ModalComponent from "./ui/ModalComponent";
import FormComponent from "./ui/FormComponent";
import DetailComponent from "./ui/DetailComponent";
import toast from "react-hot-toast";

function ProductList({
  productData,
  fetchAllProducts,
  deleteProduct,
  updateProduct,
}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = () => {
    fetch("http://localhost:3011/products")
      .then((response) => response.json())
      .then((data) => {
        fetchAllProducts(data);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  };

  const handleView = (productInfo) => {
    setShowViewModal(true);
    setSelectedProduct(productInfo);
  };

  const handleEdit = (productInfo) => {
    console.log(productInfo);
    setShowEditModal(true);
    setSelectedProduct(productInfo);
  };

  const confirmUpdate = () => {
    fetch(`http://localhost:3011/products/${selectedProduct.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: selectedProduct.id,
        name: selectedProduct.name,
        sku: selectedProduct.sku,
        brand: selectedProduct.brand,
        description: selectedProduct.description,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        updateProduct(selectedProduct.id, data);
        setShowEditModal(false);
        toast.success("Product successfully edited");
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  const handleDelete = (productInfo) => {
    setShowDeleteModal(true);
    setSelectedProduct(productInfo);
  };

  const confirmDelete = () => {
    fetch(`http://localhost:3011/products/${selectedProduct.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok === true) {
          deleteProduct(selectedProduct.id);
        }
        setShowDeleteModal(false);
        toast.success("Product successfully deleted");
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  return (
    <>
      <Container>
        <Row className="py-5 mt-5">
          <AddProduct />
        </Row>
        <Row>
          <Col>
            <Table hover responsive="sm">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Produk</th>
                  <th>SKU</th>
                  <th>Brand</th>
                  <th>Deskripsi</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {productData?.map((ele, index) => (
                  <tr key={ele.id}>
                    <td>{index + 1}</td>
                    <td>{ele.name}</td>
                    <td>{ele.sku}</td>
                    <td>{ele.brand}</td>
                    <td>{ele.description}</td>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          gap: "5px",
                        }}
                      >
                        <div>
                          <Button onClick={() => handleView(ele)}>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <AiOutlineEye
                                size={20}
                                style={{ marginRight: "5px" }}
                              />
                              View
                            </div>
                          </Button>
                        </div>
                        <div>
                          <Button
                            onClick={() => handleEdit(ele)}
                            variant="outline-primary"
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <AiFillEdit
                                size={20}
                                style={{ marginRight: "5px" }}
                              />
                              Edit
                            </div>
                          </Button>
                        </div>
                        <div>
                          <Button
                            onClick={() => handleDelete(ele)}
                            variant="outline-danger"
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <AiFillDelete
                                size={20}
                                style={{ marginRight: "5px" }}
                              />
                              Delete
                            </div>
                          </Button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {isLoading && (
              <Placeholder animation="glow">
                <Placeholder xs={12} size="lg" />
                <Placeholder xs={12} size="lg" />
                <Placeholder xs={12} size="lg" />
                <Placeholder xs={12} size="lg" />
              </Placeholder>
            )}
          </Col>
        </Row>
      </Container>

      {showViewModal && (
        <ModalComponent
          showModal={showViewModal}
          setShowModal={setShowViewModal}
          title="Product Detail"
          confirmButtonText="OK"
          cancelButtonText="Cancel"
          content={<DetailComponent selectedproduct={selectedProduct} />}
          showButton={false}
        />
      )}

      {showEditModal && (
        <ModalComponent
          showModal={showEditModal}
          setShowModal={setShowEditModal}
          confirmAction={confirmUpdate}
          title="Edit Product"
          content={
            <FormComponent
              selectedproduct={selectedProduct}
              setselectedproduct={setSelectedProduct}
            />
          }
          confirmButtonText="Update"
          cancelButtonText="Cancel"
          isConfirmDisabled={
            selectedProduct.name === "" || selectedProduct.address === ""
          }
        />
      )}

      {showDeleteModal && (
        <ModalComponent
          showModal={showDeleteModal}
          setShowModal={setShowDeleteModal}
          confirmAction={confirmDelete}
          title="Delete Product"
          content="Are you sure you want to delete this product ?"
          confirmButtonText="Confirm"
          cancelButtonText="Cancel"
        />
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    productData: state.product.productData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllProducts: (data) => dispatch(fetchAllProducts(data)),
    updateProduct: (id, data) => dispatch(updateProduct(id, data)),
    deleteProduct: (id) => dispatch(deleteProduct(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
