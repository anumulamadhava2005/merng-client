import React, { useContext }from 'react'
import { Button, Card, Icon, Label, Popup } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import moment from 'moment';

import { AuthContext } from '../context/auth'
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton'
import imageForm from './postForm/imageForm'

function PostCard({
    post: {username, id, commentCount, likeCount, createdAt, body},
})  {
    const { user } = useContext(AuthContext);

    return (
        <Card fluid>
            <Card.Content>
                <Card.Header as={Link} to={`/posts/${id}`}>{username}</Card.Header>
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
                            <Button color='teal' basic>
                                <Icon name='commenting' />
                            </Button>
                            <Label basic color='pink' pointing='left'>
                                {commentCount}
                            </Label>
                        </Button>
                    }
                />
                {user && username === user.username && (
                    <DeleteButton postId={id} />
                )}
                <div class="ui card">
                   <div class="content">
                     <div class="ui placeholder">
                         <div class="ui image fluid">   src="imageForm.image"</div>
                     </div>
                   </div>
                </div>
            </Card.Content>
        </Card>
    );
}

export default PostCard;
