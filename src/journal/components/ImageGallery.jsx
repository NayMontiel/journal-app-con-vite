import { ImageList, ImageListItem } from "@mui/material";


export const ImageGallery = ({ images = [] }) => {

  console.log(images);

  return (
    <ImageList
      sx={{ width: "100%", height: 500, mt: 2 }}
      cols={4}
      rowHeight={200}
    >
      {images.map((img) => (
        <ImageListItem key={img}>
          <img
            src={`${img}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt="imagenes de la nota"
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};
