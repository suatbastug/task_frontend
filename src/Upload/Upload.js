import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import useStyles from "./style";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ReactAudioPlayer from "react-audio-player";
import DeleteIcon from "@mui/icons-material/Delete";

const Upload = () => {
  const classes = useStyles();
  const [data, setData] = useState([]);

  useEffect(() => {
    AllAudio();
  }, []);

  // upload audio
  const uploadHandler = (event) => {
    const file = event.target.files[0];
    var formdata = new FormData();
    formdata.append("file", file);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch("http://localhost:5000/addAudio", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.Status) {
          AllAudio();
        }
      })
      .catch((error) => console.log("error", error));
  };

  //get all audio
  const AllAudio = () => {
    var requestOptions = {
      method: "POST",
      redirect: "follow",
    };
    fetch("http://localhost:5000/getAudio", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status) {
          setData(result.data);
        }
      })
      .catch((error) => console.log("error", error));
  };

  // delete audio
  const DeleteAudio = (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      Id: id,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:5000/deleteAudio", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.Status) {
          AllAudio();
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <div className={classes.Root}>
        <span className={classes.uploadText}>Upload Files Here</span>
        <div className={classes.uploadDiv}>
          <input
            type="file"
            className={classes.inputFile}
            onChange={uploadHandler}
          />
          <Button variant="contained" className={classes.uploadButton}>
            <AddCircleIcon className={classes.addIcon} />
            Upload
          </Button>
        </div>
        {/* display all Audio files here */}
        {data.map((number, index) => (
          <div key={index} className={classes.ListItems}>
            <ReactAudioPlayer
              src={number.file}
              controls
              style={{ color: "#673AB7" }}
            />
            <DeleteIcon
              onClick={() => {
                DeleteAudio(number.id);
              }}
              className={classes.deleteIcon}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Upload;
