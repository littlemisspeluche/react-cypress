import React, { useState, useEffect } from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

// import './css/style.css';
import api from '../api/notes'
import PostShorthand from './NoteShorthand';
import UpdatePost from './UpdateNote';
import AddPost from './AddNote';

const PostsList = (props) => {
  const [posts, setPosts] = useState([]);
  const [selected, setSelected] = useState();
  const [isAddPost, setIsAddPost] = useState(false);

  useEffect(() => {
    try {
      const getPosts = async () => {
        const postList = await retrievePosts();
        if (postList) setPosts(postList);

        if (postList.length > 0) {
          setSelected(postList[0]);
        };
      };
      getPosts();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    removeEmpyNote();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const removeEmpyNote = () => { 
    posts.forEach(x => {
      if ((x.title === null || x.title === '') && (x.content === null || x.content === '')) {
        deletePostHandler(x.id);
      };
    });
  };

  const retrievePosts = async () => {
    const response = await api.get('/notes');
    return response.data;
  };

  const deletePostHandler = async (id) => {
    await api.delete(`/notes/${id}`);
    const newPostsList = posts.filter((post) => {
      return post.id !== id;
    });
    setPosts(newPostsList);
  };

  const handleAddPost = () => {
    console.log("here")
    setIsAddPost(true);
    setSelected();
  };
 
  return (
    <div className='container'>
      <div style={{display:'flex', justifyContent: 'space-around'}}>
        <div className="postsShort">
          {
            posts?.map((post) => {
              return (
                <PostShorthand
                  selected={selected}
                  setSelected={setSelected}
                  post={post}
                  deletePostHandler={deletePostHandler}
                  key={post.id}
                  setIsAddPost={setIsAddPost}
                />
              )
            })
          }
          <div className="addButtonContainer">
            <Fab id="fab">
              <AddIcon onClick={() => handleAddPost()}/>
            </Fab>
          </div>
        </div>
        <div style={{width: '65%'}}>
          {selected &&
            <UpdatePost deletePostHandler={deletePostHandler} posts={posts} setPosts={setPosts} selected={selected} setSelected={setSelected} /> 
          }
          {
            (isAddPost || posts.length < 1) && !selected && 
            <AddPost setPosts={setPosts} posts={posts} />
          }
        </div>
      </div>
    </div>
  );
};

export default PostsList;