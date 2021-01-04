import React, {useContext, useRef, useState} from 'react'
import gql from 'graphql-tag'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { Button, Card, Grid, Label, Icon, Form } from 'semantic-ui-react';
import moment from 'moment'

import { AuthContext } from '../context/auth';
import LikeButton from '../components/LikeButton'
import DeleteButton from '../components/DeleteButton';
import { Link } from 'react-router-dom';

function SinglePost(props){
    const postId = props.match.params.postId;
    const { user } = useContext(AuthContext);
    const commentInputRef = useRef(null);
    
    const [comment, setComment] = useState('');

    const { data: { getPost } = {}} = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
        }
    });

    const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
        update(){
            setComment('');
            commentInputRef.current.blur();
        },
        variables: {
            postId,
            body: comment
        }
    })

    function deletePostCallback(){
        props.history.push('/')
    }

    let postMarkup;
    if(!getPost){
        postMarkup = <p>Loading post..</p>
    } else{
        const { id, body, createdAt, username, comments, likes, likeCount, commentCount} = 
        getPost;

        postMarkup = (
            <Grid.Row>
                <Button as={Link} to={"/"} color="blue" style={{margin: 20}} >
                    <Icon name="arrow left" />
                </Button>
                <Grid.Column width={10}>
                    <Card fluid>
                        <Card.Content>
                            <Card.Header>{username}</Card.Header>
                            <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                            <Card.Description>{body}</Card.Description>
                        </Card.Content>
                        <hr/>
                        <Card.Content extra>
                            <LikeButton user={user} post={{ id, likeCount, likes }}/>
                            <Button
                                as="div"
                                labelPosition="right"
                                onClick={() => console.log('Comment on post')}
                                >
                                    <Button basic color="blue">
                                        <Icon name="commenting"/>
                                    </Button>
                                    <Label basic color="blue" pointing="left">
                                        {commentCount}
                                    </Label>
                                </Button>
                                {user && user.username === getPost.username && (
                                    <DeleteButton postId={id} callback={deletePostCallback}/>
                                )}
                        </Card.Content>
                    </Card>
                    {user && (
                        <Card fluid>
                            <Card.Content>
                                <p>POST A COMMENT :D</p>
                                <Form>
                                    <div className="ui action input fluid">
                                        <input
                                            type="text"
                                            placeholder="Comment.."
                                            name="comment"
                                            value={comment}
                                            onChange={event => setComment(event.target.value)}
                                            ref={commentInputRef}
                                        />
                                        <Button type="submit"
                                            className="ui button teal"
                                            disabled={comment.trim() === ''}
                                            onClick={submitComment}
                                        >
                                            Post Comment
                                        </Button>
                                    </div>
                                </Form>
                            </Card.Content>
                        </Card>
                    )}
                    {comments.map(comment => (
                        <Card fluid key={comment.id}>
                            <Card.Content>
                                {user && user.username === comment.username && (
                                    <DeleteButton postId={id} commentId={comment.id}/>
                                )}
                                <Card.Header>{comment.username}</Card.Header>
                                <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                                <Card.Description>{comment.body}</Card.Description>
                            </Card.Content>
                        </Card>
                    ))}
                </Grid.Column>
            </Grid.Row>
        )
    }
    return postMarkup;
}

const SUBMIT_COMMENT_MUTATION = gql`
    mutation($postId: ID!, $body: String!){
        createComment(postId: $postId, body: $body){
            id
            comments{
                id 
                body 
                createdAt 
                username
            }
            commentCount
        }
    }
`

const FETCH_POST_QUERY = gql`
    query($postId: ID!){
        getPost(postId: $postId){
            id body createdAt username likeCount
            likes{
                username
            }
            commentCount
            comments{
                id username createdAt body
            }
        }
    }
`

export default SinglePost;