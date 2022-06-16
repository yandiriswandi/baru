import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar/Navbar';
import ic from '../images/ic_attach.png';
import add from '../images/addBtn.png';
import { useNavigate } from 'react-router-dom';
import { API } from '../config/api';
import { useMutation } from 'react-query';

export default function AddBook() {
  let navigate = useNavigate();

  const [preview, setPreview] = useState(null); //For image preview
  const [form, setForm] = useState({
    title: '',
    author: '',
    year: '',
    pages: '',
    ISBN: '',
    price: '',
    desc: '',
    bookPdf: '',
    bookImg: '',
  }); //Store product data
  console.log(form);

  // Handle change data on form
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === 'file' ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === 'file') {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleChangePdf = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === 'file' ? e.target.files : e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Store data with FormData as object
      const formData = new FormData();
      formData.set('title', form.title);
      formData.set('author', form.author);
      formData.set('year', form.year);
      formData.set('pages', form.pages);
      formData.set('ISBN', form.ISBN);
      formData.set('price', form.price);
      formData.set('desc', form.desc);
      formData.set('bookPdf', form.bookPdf[0], form?.bookPdf[0]?.name);
      formData.set('bookImg', form.bookImg[0], form?.bookImg[0]?.name);

      console.log('dataform', formData);

      // Configuration
      const config = {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      };

      // Insert product data
      const response = await API.post('/add-book', formData, config);
      console.log(response);

      navigate('/');
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div className="bg-homes">
      <Navbar />
      <form onSubmit={(e) => handleSubmit.mutate(e)}>
        <div className="container form-book">
          <h3 className="mb-4">Add Book</h3>
          <input
            type="text"
            placeholder="Title"
            className="form-control mb-3 "
            name="title"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Author"
            className="form-control mb-3 "
            name="author"
            onChange={handleChange}
          />
          <input
            type="date"
            placeholder="Publication Date"
            className="form-control mb-3"
            name="year"
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Pages"
            className="form-control mb-3"
            name="pages"
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="ISBN"
            className="form-control mb-3"
            name="ISBN"
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Price"
            className="form-control mb-3"
            name="price"
            onChange={handleChange}
          />
          <textarea
            className="w-100 px-2 py-2 rounded "
            placeholder="About This Book"
            name="desc"
            onChange={handleChange}
          ></textarea>
          <div className="form-group mt-3">
            <input
              type="file"
              id="actual-btn"
              className="inputFile "
              name="bookPdf"
              onChange={handleChangePdf}
              hidden
            />
            <label htmlFor="actual-btn" className="btn border border-dark">
              Attache Pdf File
              <img className="float-right ml-3" src={ic} alt="" />
            </label>
          </div>

          <div className="form-group mt-3  ">
            <input
              type="file"
              id="actual-btn2"
              name="bookImg"
              onChange={handleChange}
              className="inputFile"
              hidden
            />
            <label htmlFor="actual-btn2" className="btn border border-dark">
              Attache Book Cover
              <img className="float-right ml-2" src={ic} alt="" />
            </label>
          </div>
          {preview && (
            <div>
              <img
                src={preview}
                style={{
                  maxWidth: '150px',
                  maxHeight: '150px',
                  objectFit: 'cover',
                }}
              />
            </div>
          )}
          <div className="text-end pb-5">
            <button className="mt-3 btn btn-secondary  " type="submit">
              Add Book
              <img className="ms-2 " src={add} alt="" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
