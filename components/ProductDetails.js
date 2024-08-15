
import { useEffect, useState, useContext } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import Link from 'next/link';
import { getToken } from "../lib/authenticate";
import { CartContext } from '../pages/_app';

export default function ProductDetails() {
    const { cart, setCart } = useContext(CartContext);
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
            headers: { Authorization: `JWT ${getToken()}` }
        });
        const data = await response.json();
        setProducts(data);
    }

    function showProductDetails(product) {
        setSelectedProduct(product);
    }

    function addToCart(product) {
        setCart([...cart, product]);
    }

    function search() {
        const searchInput = document.getElementById('searchInput').value;
        const rows = document.querySelectorAll('#productTableBody tr');

        rows.forEach(row => {
            const title = row.children[0].innerText; 
            if (title === searchInput) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    return (
        <>
            <Head>
                <title>Product Details</title>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link
                    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
                    rel="stylesheet"
                    integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
                    crossorigin="anonymous"
                />
            </Head>
            <nav className="navbar navbar-expand-lg navbar-dark bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#"></a>
                    <button className="navbar-toggler" type="button"data-bs-toggle="collapse"data-bs-target="#navbarSupportedContent"aria-controls="navbarSupportedContent"aria-expanded="false"aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
                        <form className="d-flex">
                            <input className="form-control mr-sm-2" type="search" id="searchInput" placeholder="Search product by ID" aria-label="Search"/>
                            <button className="btn btn-outline-success my-2 my-sm-0" type="button" onClick={search}>Search</button>
                        </form>
                        <Link href="./Cart">
                            <button className="btn btn-outline-primary my-2 my-sm-0" type="button">Cart ({cart.length})</button>
                        </Link>
                    </div>
                </div>
            </nav>
            <div className="table-container" style={{ backgroundColor: '#000000' }}> 
                <table className="table table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Title</th>
                            <th scope="col">Price</th>
                            <th scope="col">Category</th>
                            <th scope="col">Visual</th>
                            <th scope="col">Rating</th>
                            <th scope="col">InStock</th>
                            <th scope="col">Add to cart</th>
                        </tr>
                    </thead>
                    <tbody id="productTableBody">
                        {products.map(product => (
                            <tr key={product.id} onClick={() => showProductDetails(product)}>
                                <td>{product.id}</td>
                                <td>{product.title}</td>
                                <td>${product.price}</td>
                                <td>{product.category}</td>
                                <td>
                                    <img src={product.image} alt={product.title} width="50" />
                                </td>
                                <td>{product.rating.rate}</td>
                                <td>{product.rating.count}</td>
                                <td>
                                    <button className="btn btn-primary text-white bg-information " onClick={(e) => {e.stopPropagation(); addToCart(product)}}>🛒</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {selectedProduct && (
                <div className="modal fade show" style={{ display: 'block' }} id="productModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{selectedProduct.title}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setSelectedProduct(null)}></button>
                            </div>
                            <div className="modal-body">
                                <h5 id="modalTitle">{selectedProduct.title}</h5>
                                <img id="modalImage" src={selectedProduct.image} className="img-fluid" alt="Product Image"/>
                                <p id="modalDescription">{selectedProduct.description}</p>
                                <p>
                                    <strong>Price: </strong>
                                    <span id="modalPrice">${selectedProduct.price}</span>
                                </p>
                                <p>
                                    <strong>Category: </strong>
                                    <span id="modalCategory">{selectedProduct.category}</span>
                                </p>
                                <p>
                                    <strong>Rating: </strong>
                                    <span id="modalRating">{selectedProduct.rating.rate} ({selectedProduct.rating.count} reviews)</span>
                                </p>
                                <button className="btn btn-primary" onClick={() => addToCart(selectedProduct)}>Add to Cart</button>
                            </div>
                            <div className="modal-footer">
                                <button id="closeModal" type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => setSelectedProduct(null)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"/>
            <Script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js" />
        </>
    );
}
