import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag'
import { Button, Label, Icon, Popup } from 'semantic-ui-react'

function LikeButton({post: { id, likeCount, likes }, user }) {
    const [liked, setLiked] = useState(false);
    
    useEffect(() => {
        if (user){
            if (user && (like => like.username === user.username)){
            setLiked(true);
        }} else setLiked(false);
    }, [user, likes]);

    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables: { postId: id }
    });

    const likeButton = user ? (
        liked ? (
            <Button color='violet' basic  >
                    <Icon name='thumbs up' />
            </Button>
        ) : (
                <Button color='violet' basic  >
                <Icon name='thumbs up' />
        </Button>
        )
    ) : (
            <Button as={Link} to="/login" color='violet' basic >
            <Icon name='thumbs up' />
        </Button>
    )

    return (
        <Popup
            content={liked ? 'like' : 'Unlike'}
            inverted
            trigger={
                <Button as="div" labelPosition='left' onClick={likePost}>
                    {likeButton}
                    <Label color='blue' pointing='left'>
                        {likeCount}
                    </Label>
                </Button>
            }
            />
    )
}

const LIKE_POST_MUTATION = gql`
    mutation likePost($postId: ID!){
        likePost(postId: $postId){
            id
            likes {
                id username
            }
            likeCount
        }
    }
`

export default LikeButton;