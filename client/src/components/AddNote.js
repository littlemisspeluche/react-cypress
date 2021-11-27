import React, { useState, createRef } from 'react';
import { uuid } from 'uuidv4';

import api from '../api/notes';

const AddPost = ({setPosts, posts}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  let textareaRef = createRef();
  const state = {
    title,
    content,
  };

  const handleAddPost = async (post) => {
    const request = {
      id: uuid(),
      ...post,
    };

    const response = await api.post('/notes', request);
    setPosts([response.data, ...posts]);
  };
    
  const add = (e) => {
    e.preventDefault();
    
    if (title === '' && content === '') {
      return;
    }

    handleAddPost(state);
    setTitle('');
    setContent('');
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function handleKeyUp(e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
      textareaRef.current.focus();
    }
  }

  return (
    <div className='main'>
      <div className="formContainer">
        <form className='form' onSubmit={add}>
          {title.length < 1 &&
            <h3 className="noteTitle">Give this thought a title..</h3>
          }
          <div className='field'>
            <input
              name='title'
              value={title}
              onKeyUp={handleKeyUp}
              onChange={(e) => setTitle(capitalizeFirstLetter(e.target.value))}
            />
          </div>
          <div className='field'>
            <textarea
              name='content'
              value={content}
              onChange={(e) => setContent(e.target.value)}
              ref={textareaRef}
            />
          </div>
          <div className="saveButtonContainer">
            <div className="saveButton">
              <button>Save</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPost;