import React from 'react'
import { Button, Form } from 'semantic-ui-react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import {useForm } from '../util/hooks'
import { FETCH_POSTS_QUERY } from '../util/graphql'

function PostForm(){
    const { values, onChange, onSubmit} = useForm(createPostCallback, {
        body: ''
    });

    const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        update(proxy, result){
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            });
            data.getPosts = [result.data.createPost, ...data.getPosts];
            proxy.writeQuery({ query: FETCH_POSTS_QUERY, data});
            values.body = '';
        }
    });

    function createPostCallback(){
        createPost();
    }
    return (
        <>
            <Form onSubmit={onSubmit}>
                <h2>Create a Post:</h2>
                <Form.Field>
                    <Form.Input
                        placeholder="Hi World!"
                        name="body"
                        onChange={onChange}
                        value={values.body}
                        error={error ? true : false}
                    />
                    <Button type="submit" basic color="orange">
                        Commit
                    </Button>
                   </Form.Field>
             </Form>
             {error && (
                 <div className="ui error message" style={{marginBottom: 20 }}>
                     <ul className="list">
                         <li>{error.graphQLErrors[0].message}</li>
                     </ul>
                </div>
            )}
        </>
    );
}

function imageForm(){
    <style>
    /* Image Designing Propoerties */
    .thumb {
        height: 75px;
        border: 1px solid #000;
        margin: 10px 5px 0 0;
    }
    </style>

  <script type="text/javascript">
    /* The uploader form */
      function imageIsLoaded(e) {
        $('#myImg').attr('src', e.target.result);
        $('#yourImage').attr('src', e.target.result);
    };
    $(function () {
        $(":file").change(function () {
            if (this.files && this.files[0]) {
                var reader = new FileReader();

                reader.onload = imageIsLoaded;
                reader.readAsDataURL(this.files[0]);
            }
        });
    });

  </script>
  
  const Image(
  <input type='file' />
  </br><img id="myImg" src="#" alt="your image" height=200 width=100 /></br>)
}

const CREATE_POST_MUTATION = gql`
    mutation createPost($body: String!){
        createPost(body: $body){
            id body createdAt username
            likes{
                id username createdAt
            }
            likeCount
            comments{
                id body username createdAt
            }
            commentCount
        }
    }
`

export default PostForm;
export default imageForm;
