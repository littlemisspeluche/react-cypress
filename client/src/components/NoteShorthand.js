import React from 'react';

import './css/index.scss';

const PostShorthand = ({selected, post, setSelected, deletePostHandler, setIsAddPost}) => {
  const { id, title, content } = post;

  const handleSelected = (noteItem) => {
    setIsAddPost(false)
    setSelected(post)
  }


  return (
    <div onClick={() => handleSelected()} className="shorthandContainer">
      <div id='subcard' className={selected?.id === id ? 'selectedItemRow' : 'itemRow'}>
        <div className='shorthandContentContainer'>
          <div className='shorthandContent'>
            <h3 className='text'>{title}</h3>
            <p className='subtext'>{content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostShorthand;