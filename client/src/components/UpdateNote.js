import React from 'react';

import api from '../api/notes';

const UpdatePost = ({selected, setSelected, setPosts, posts}) => {
  const update = (e) => {
    const {name, value} = e.target;
    if (selected.title === '' && selected.content === '') {
      return;
    } else {
      let selectedCopy = {...selected};
  
      if (name === "title") {
        selectedCopy['title'] = value ? value : '';
      } else if (name === "content") {
        selectedCopy['content'] = value ? value : '';
      };
  
      setSelected(selectedCopy);
  
      const state = {
        id: selectedCopy.id,
        title: selectedCopy.title,
        content: selectedCopy.content,
      };
  
      editPost(state);
    };
  };

  const editPost = async (post) => {
    const response = await api.put(`/notes/${post.id}`, post);
    const { id } = response.data;
    
    setPosts(
      posts.map((post) => {
        return post.id === id ? { ...response.data } : post;
      })
    );
  };
  
  return (
    <div className='main'>
      <div className="formContainer">
        <form className='form'>
          <div className='field'>
            <input
              name='title'
              value={selected.title}
              onChange={(e) => update(e)}
            />
          </div>
          <div className='field'>
            <textarea
              id="editFormTextarea"
              name='content'
              value={selected.content}
              onChange={(e) => update(e)}
            />
          </div>
          <div
            style={{
              marginTop: '20px',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePost;