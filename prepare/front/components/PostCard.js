import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import {
  Card,
  Button,
  Avatar,
  Form,
  Input,
  List,
  Comment,
  Popover,
} from "antd";
import {
  RetweetOutlined,
  HeartTwoTone,
  HeartOutlined,
  MessageOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";

import PostImages from "./PostImages";
import CommentForm from "./CommentForm";
import PostCardContent from "./PostCardContent";

const PostCard = ({ post }) => {
  const id = useSelector(state => state.user.me?.id);
  const [liked, setLiked] = useState(false);
  const [commentFormOpended, setCommentFormOpended] = useState(false);
  const onToggleLike = useCallback(() => {
    setLiked(prev => !prev);
  }, []);
  const onToggleCommentOpened = useCallback(() => {
    setCommentFormOpended(prev => !prev);
  }, []);

  return (
    <div style={{ marginBottom: 20 }}>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" />,
          liked ? (
            <HeartTwoTone
              twoToneColor="#eb2f96"
              key="heart"
              onClick={onToggleLike}
            />
          ) : (
            <HeartOutlined key="heart" onClick={onToggleLike} />
          ),
          <MessageOutlined key="message" onClick={onToggleCommentOpened} />,
          <Popover
            key="ellipsis"
            content={
              <Button.Group>
                {id && post.UserId === id ? (
                  <>
                    <Button>수정</Button>
                    <Button type="danger">삭제</Button>
                  </>
                ) : (
                  <Button>신고</Button>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickName[0]}</Avatar>}
          title={post.User.nickName}
          description={<PostCardContent postData={post.content} />}
        />
      </Card>
      {commentFormOpended && (
        <div>
          <CommentForm post={post} />
          <List
            header={`${post.Comments.length} 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={item => (
              <li>
                <Comment
                  author={item.User.nickName}
                  avatar={<Avatar>{item.User.nickName[0]}</Avatar>}
                  content={item.content}
                />
              </li>
            )}
          />
        </div>
      )}
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    User: PropTypes.object,
    content: PropTypes.string,
    img: PropTypes.string,
    createdAt: PropTypes.object,
  }),
};
export default PostCard;
