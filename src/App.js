import React, { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import Loader from "./components/Loader";
import Unsplash from "./components/Unsplash";
import axios from "axios";
import styled from "styled-components";
import { TextField } from "@material-ui/core";
import { createGlobalStyle } from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";
import { SRLWrapper } from "simple-react-lightbox";

// Style - Globalstyles applied to the main app page
const GlobalStyle = createGlobalStyle`
 * {
   margin: 0;
   padding: 0;
   box-sizing: border-box;
 }

 body {
   font-family: 'Montserrat', sans-serif;
 }
`;

const WrapperImage = styled.section`
  /* max-width: 70rem; */
  width: 90%;
  height: 55rem;
  margin: 4rem auto;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-rows: 350px;
  grid-gap: 15px;
  cursor: pointer;
`;

const WrapperForm = styled.div`
  width: 50%;
  display: flex;
  margin: 0 auto;
  align-items: center;
  flex-direction: column;
  padding: 20px;
`;

const styles = {
  root: {
    background: "white",
  },

  input: {
    color: "white",
  },
};

function App() {
  const [value, setValue] = useState("");
  const [images, setImages] = useState([]);

  // useRef, whenever you change value doesnt rerender the page, and not async

  const referenceImages = useRef([]);
  const referenceCount = useRef(0);

  // useEffect(() => {
  //   fetchImages(images);
  // }, [setValue]);

  // is there a way to set useEffect to fetchData() when user scrolls to the bottom? Thought that was the job of the InfiniteScroller component?

  /* first thing to do is to render the logic that'll allow me to take the user input and submit it to the api with query parameters
  forms take onSubmit and input takes onChange */

  // handleChange logs user values in form
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  // handleSubmit prevents the form default refresh nature
  const handleSubmit = (e) => {
    e.preventDefault();

    referenceImages.current = [];

    referenceCount.current = 0;

    fetchImages();
  };

  const fetchImages = () => {
    const apiRoot = "https://api.unsplash.com/";
    // const accessKey = process.env.REACT_APP_ACCESSKEY;

    referenceCount.current = referenceCount.current + 1;

    axios
      .get(
        `${apiRoot}search/photos/?client_id=ut3_Brs_RQleWmiVdYUo02-5jZ0Dj0s_vfKLY258lIQ&page=${referenceCount.current}&query=${value}`
      )
      .then((response) => {
        setImages([...referenceImages.current, ...response.data.results]);
        referenceImages.current = [
          ...referenceImages.current,
          ...response.data.results,
        ];
      });
  };

  return (
    <>
      <GlobalStyle />
      <Header />

      <form onSubmit={handleSubmit}>
        <WrapperForm>
          <TextField
            type="text"
            placeholder="Search Here"
            value={value}
            onChange={handleChange}
            fullWidth={true}
            variant="outlined"
            autofocus={true}
            label="Search Here"
          ></TextField>
        </WrapperForm>
      </form>

      <InfiniteScroll
        dataLength={images.length} //This is important field to render the next data
        next={fetchImages}
        hasMore={true}
        // loader={<Loader />}
        scrollThreshold="200px"
        style={{ overflow: "visible" }}
      >
        <SRLWrapper>
          <WrapperImage>
            {images.map((image) => (
              <Unsplash url={image.urls.regular} key={image.id} alt="" />
            ))}
          </WrapperImage>
        </SRLWrapper>
      </InfiniteScroll>
    </>
  );
}

export default App;

//{hasMore && <div ref={loaderRef}>Loading…</div>}
// example of conditional redering
// {hasMore}={true} && <Loader />

// the only time i see the Loading... is when i manually type in another entry, so its not automatically rendering when i scroll to the bottom
// however the InfiniteScroll component is working when i submit a query??? DO i have to then keep sending that exact query?
