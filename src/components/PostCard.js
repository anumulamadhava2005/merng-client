import React, { useContext }from 'react'
import { Button, Card, Icon, Label, Image, Popup } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import moment from 'moment';

import { AuthContext } from '../context/auth'
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton'

function PostCard({
    post: {username, id, commentCount, likeCount, createdAt, body}
})  {
    const { user } = useContext(AuthContext);

    return (
        <Card fluid>
            <Card.Content>
                <Image 
                    floated="right"
                    size="tiny"
                    src="https://lh3.googleusercontent.com/proxy/Jn_uluJUD7v0jISgL2H03o4YM942qLKAStnhiibJ4Cvq2aOhQ20rQ438rxdx2WmFJDx6Q92YKSppVAnA6DLhqSHIAj-x0z3SPybWAUsfbaZ5Qeffd4KYr5rt4L4c8yAOZhNpCZG6nRnJhZ0AoM0QfHiVnunmG0PR7A"
                />
                <Card.Header>{username}</Card.Header>
                <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>
                <Card.Description>{body}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <LikeButton user={user} post={{id, likeCount }}/>
                <Popup
                    content="Click to comment on post :D"
                    inverted
                    trigger={
                        <Button labelPosition='left' as={Link} to={`/posts/${id}`}>
                            <Button color='green' basic>
                                <Icon name='commenting' />
                            </Button>
                            <Label color='orange' pointing='left'>
                                {commentCount}
                            </Label>
                        </Button>
                    }
                />
                {user && username === user.username && (
                    <DeleteButton postId={id} />
                )}
            </Card.Content>
        </Card>
    );
}

export default PostCard;