import { useState } from "react";
const VideoForm = ({ setVideoForm, getAllVideos, getBackDeleteMessage }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [backendMessage, setBackendMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) {
      setErrorMessage("Title and URL are required.");
      return;
    }
    const youtubeRegExp =
      /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    if (!youtubeRegExp.test(url)) {
      setErrorMessage("Please enter a valid YouTube URL.");
      return;
    }

    // Perform the API call
    const newVideo = {
      title,
      url,
      rating: 0,
      date: new Date().getTime(),
    };
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newVideo),
      });
      if (response.status === 400) {
        const errorData = await response.json();
        const validationErrors = errorData.errors;
        setErrorMessage(validationErrors.map((error) => error.msg).join(", "));
      } else if (response.status !== 201) {
        throw new Error("Something went wrong!");
      } else {
        const data = await response.json();
        setBackendMessage(data.message);
        getAllVideos();
        setTitle("");
        setUrl("");
        setErrorMessage("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  setTimeout(() => {
    setBackendMessage("");
  }, 4000);

  return (
    <>
      <form className="add-form" onSubmit={submitHandler}>
        <div className="input-container">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            value={title}
            id="title"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="url">Url</label>
          <input
            type="text"
            value={url}
            id="url"
            name="url"
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div className="form-buttons">
          <button className="cancel-btn" onClick={() => setVideoForm(false)}>
            Cancel
          </button>
          <button className="add-btn" type="submit">
            Add
          </button>
        </div>
      </form>

      {errorMessage && (
        <div className="error-message">
          <h3>{errorMessage}</h3>
        </div>
      )}

      {backendMessage && (
        <div className="add-message">
          <h3>{backendMessage}</h3>
        </div>
      )}
    </>
  );
};

export default VideoForm;