/* eslint-disable react/prop-types */
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

function ProductList({ productData, fetchAllProducts }) {
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

  return (
    <>
      <Container>
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
                          <Button onClick={() => {}}>
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
                          <Button onClick={() => {}} variant="outline-primary">
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
                          <Button onClick={() => {}} variant="outline-danger">
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
