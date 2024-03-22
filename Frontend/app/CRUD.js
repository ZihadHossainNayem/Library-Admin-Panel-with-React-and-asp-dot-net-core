"use client";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import dynamic from "next/dynamic";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CRUD = () => {
  const bookData = [
    {
      id: 1,
      title: "Mistborn: The Final Empire",
      author: "Brandon Sanderson",
      genre: "Fantasy",
      publicationYear: 2006,
      available: 1,
    },
    {
      id: 2,
      title: "Mistborn2: The Final Empire",
      author: "Brandon Sanderson",
      genre: "Fantasy",
      publicationYear: 2002,
      available: 0,
    },
    {
      id: 3,
      title: "Mistborn2: The Final Empire",
      author: "Brandon Sanderson",
      genre: "Fantasy",
      publicationYear: 2003,
      available: 1,
    },
  ];

  /* api response for all the books data*/
  const [data, setData] = useState([]);

  /* for modal */
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /* for properties new */
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [publishedYear, setPublishedYear] = useState(null);
  const [isActive, setIsActive] = useState(0);

  /* for properties edit */
  const [editId, setEditId] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editAuthor, setEditAuthor] = useState("");
  const [editGenre, setEditGenre] = useState("");
  const [editPublishedYear, setEditPublishedYear] = useState(null);
  const [editIsActive, setEditIsActive] = useState(0);

  useEffect(() => {
    getData();
  }, []);

  /* api here */
  const getData = () => {
    axios
      .get("https://localhost:7030/api/BookCollection")
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = (id) => {
    handleShow();

    axios
      .get(`https://localhost:7030/api/BookCollection/${id}`)
      .then((result) => {
        setEditTitle(result.data.title);
        setEditAuthor(result.data.author);
        setEditGenre(result.data.genre);
        setEditPublishedYear(result.data.publishedYear);
        setEditIsActive(result.data.isActive);
        setEditId(id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete the record?") == true) {
      axios
        .delete(`https://localhost:7030/api/BookCollection/${id}`)
        .then((result) => {
          if (result.status === 200) {
            toast.success("Deleted Successfully");
            getData();
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  const handleUpdate = () => {
    const url = `https://localhost:7030/api/BookCollection/${editId}`;
    const data = {
      id: editId,
      title: editTitle,
      author: editAuthor,
      genre: editGenre,
      publishedYear: editPublishedYear,
      isActive: editIsActive,
    };
    axios
      .put(url, data)
      .then((result) => {
        handleClose();
        getData();
        clear();
        toast.success("Book has been Updated!");
      })
      .catch((error) => toast.error(error));
  };

  const handleSave = () => {
    const url = "https://localhost:7030/api/BookCollection";
    const data = {
      title: title,
      author: author,
      genre: genre,
      publishedYear: publishedYear,
      isActive: isActive,
    };

    axios
      .post(url, data)
      .then((result) => {
        getData();
        clear();
        toast.success("Book has been Added!");
      })
      .catch((error) => toast.error(error));
  };

  const clear = () => {
    setTitle("");
    setAuthor("");
    setGenre("");
    setPublishedYear("");
    setIsActive(0);

    setEditTitle("");
    setEditAuthor("");
    setEditGenre("");
    setEditPublishedYear("");
    setEditIsActive(0);
  };

  const handleActiveChange = (e) => {
    if (e.target.checked) {
      setIsActive(1);
    } else {
      setIsActive(0);
    }
  };

  const handleEditActiveChange = (e) => {
    if (e.target.checked) {
      setEditIsActive(1);
    } else {
      setEditIsActive(0);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="border rounded p-4 mb-8">
        {/* new entry */}
        <h5 className="text-white text-center">New Entry</h5>
        <Container>
          <Col>
            <Row className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Row>
            <Row className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Author Name..."
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </Row>
            <Row className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Genre..."
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              />
            </Row>
            <Row className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Publication Year..."
                value={publishedYear}
                onChange={(e) => setPublishedYear(e.target.value)}
              />
            </Row>
            <Row className="mb-3">
              <Col>
                <label className="text-white"> is Available?</label>
              </Col>
              <Col>
                <input
                  type="checkbox"
                  checked={isActive == 1 ? true : false}
                  onChange={handleActiveChange}
                  value={isActive}
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <button
                className="btn btn-primary"
                onClick={(e) => handleSave(e)}
              >
                Save{" "}
              </button>
            </Row>
          </Col>
        </Container>
      </div>

      {/* records table */}
      <h5 className="text-center text-white">-----Books Record-----</h5>
      <Table striped bordered hover responsive variant="dark">
        <thead className="text-center">
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th className="max-w-32 truncate">Publication Year</th>
            <th>Available</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {data && data.length > 0
            ? data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="min-w-20 ">{index + 1}</td>
                    <td className="min-w-20 ">{item.id}</td>
                    <td className="max-w-48 truncate">{item.title}</td>
                    <td className="max-w-32 truncate">{item.author}</td>
                    <td>{item.genre}</td>
                    <td>{item.publishedYear}</td>
                    <td>{item.isActive}</td>
                    <td colSpan={2} className="flex gap-2 justify-center">
                      <button
                        className="btn btn-primary"
                        onClick={() => handleEdit(item.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            : "Empty"}
        </tbody>
      </Table>

      {/* Edit modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Col className="px-12">
            <Row className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Title..."
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            </Row>
            <Row className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Author Name..."
                value={editAuthor}
                onChange={(e) => setEditAuthor(e.target.value)}
              />
            </Row>
            <Row className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Genre..."
                value={editGenre}
                onChange={(e) => setEditGenre(e.target.value)}
              />
            </Row>
            <Row className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Publication Year..."
                value={editPublishedYear}
                onChange={(e) => setEditPublishedYear(e.target.value)}
              />
            </Row>
            <Row className="mb-3">
              <Col>
                <label> is Available?</label>
              </Col>
              <Col>
                <input
                  type="checkbox"
                  checked={editIsActive == 1 ? true : false}
                  onChange={(e) => handleEditActiveChange(e)}
                  value={editIsActive}
                />
              </Col>
            </Row>
          </Col>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default dynamic(() => Promise.resolve(CRUD), { ssr: false });
