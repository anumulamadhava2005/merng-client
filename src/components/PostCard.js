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
                    src="https://scontent.fhyd6-1.fna.fbcdn.net/v/t1.0-9/109314782_1144404872605453_145692745252314758_n.jpg?_nc_cat=104&ccb=2&_nc_sid=09cbfe&_nc_ohc=PsaCLlY-5P4AX-sXKaD&_nc_ht=scontent.fhyd6-1.fna&oh=cd1f0cfdeefc9feb6fe853921b5a6df4&oe=60127E27"
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