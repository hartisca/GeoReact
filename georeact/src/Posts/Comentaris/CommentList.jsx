import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useEffect } from "react";
import { Comment } from "./Comment";

import { useContext } from "react";
import { UserContext } from "../../userContext";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import  CommentAdd  from "./CommentAdd";
import { CommentsContext } from "./CommentsContext";
// Fem servir un context únicament dins de tots els components de Reviews

import { getComments } from "../../slices/comments/thunks";
import { setcommentsCount } from "../../slices/comments/commentSlice";

/**
 * Component that renders a list of comments for a given post.
 *
 * @component
 * @param {object} props - The props that are passed to this component.
 * @param {string} props.id - The id of the post for which the comments are to be displayed.
 * @param {number} props.comments_count - The total number of comments for the post.
 * @return {JSX.Element} - A JSX element that represents the comment list component.
 */

const CommentList = ({id, comments_count}) => {
  // Extract user context variables.
  let { usuari, setUsuari, authToken, setAuthToken, email, userEmail } = useContext(UserContext);

  // Get access to the dispatch function and the state variables from the comments slice.
  const dispatch = useDispatch();
  const { comments = [], page=0, isLoading=true, add=true, error="", reviewsCount=0} = useSelector((state) => state.comments);


  // Fetch the comments for the given post id and set the comments count on initial mount of the component.
  useEffect(() => {
    dispatch(setcommentsCount(comments_count));
    dispatch(getComments(0, id, authToken, email));
  }, []);

  return (
  <>
    { add ? <CommentAdd id={id}/>:""}
    <Container className="bg-secondary mw-100">
        <Row>
        {comments.map((v) => {
          return <Comment key={v.id} comment={v} />;
        })}
        </Row>
    </Container>

    {error ? (
      <div className="flex mb-4 w-full items-center space-x-2 rounded-2xl bg-red-50 px-4 ring-2 ring-red-200 ">
        {error}
      </div>
    ) : (
      <></>
    )}

    
  </>
);
  
}

export default CommentList