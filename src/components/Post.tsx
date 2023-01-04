import * as DateFNS from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { Avatar } from "./Avatar";
import { Comment } from "./Comment";
import styles from "./Post.module.css";
import { ChangeEvent, FormEvent, FormEventHandler, useState } from "react";

interface PostProps {
  post: {
    author: {
      name: string;
      avatarUrl: string;
      role: string;
    };
    publishedAt: Date;
    content: Array<{ type: string; content: string }>;
  };
}

export function Post({ post: { author, content, publishedAt } }: PostProps) {
  const [comments, setComments] = useState([
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illumblanditiis ad adipisci nam, tenetur rem sint ut velit dolor nostrum reprehenderit dolorum dignissimos hic neque suscipit maiores omnistotam harum.",
  ]);
  const [newCommentText, setNewCommentText] = useState("");

  const publishedAtFormatted = DateFNS.format(
    publishedAt,
    "d 'de' LLLL 'às' HH:mm'h'",
    {
      locale: ptBR,
    }
  );
  const publishedAtRelativeToNew = DateFNS.formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  const handleCreateNewPost = (e: FormEvent) => {
    e.preventDefault();

    setComments((prev) => [...prev, newCommentText]);
    setNewCommentText("");
  };

  const handleNewCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.target.setCustomValidity("");
    setNewCommentText(e.target.value);
  };

  const handleNewCommentInvalid: FormEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
    (e.target as HTMLTextAreaElement).setCustomValidity(
      "Esse campo é obrigatório!"
    );
  };

  const deleteComment = (comment: string) => {
    const commentsWithoutDeletedOne = comments.filter((c) => c !== comment);

    setComments(commentsWithoutDeletedOne);
  };

  const isNewCommentEmpty = newCommentText.trim() === "";

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span> {author.role}</span>
          </div>
        </div>
        <time dateTime={publishedAt.toISOString()} title={publishedAtFormatted}>
          {publishedAtRelativeToNew}
        </time>
      </header>

      <div className={styles.content}>
        {content.map((item) => (
          <ContentHandler
            key={item.content.trim()}
            content={item.content}
            type={item.type}
          />
        ))}
      </div>

      <form onSubmit={handleCreateNewPost} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>
        <textarea
          value={newCommentText}
          onChange={handleNewCommentChange}
          name="comment"
          placeholder="Deixe um comentário"
          required
          onInvalid={handleNewCommentInvalid}
        />
        <footer>
          <button disabled={isNewCommentEmpty} type="submit">
            Comentar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map((comment) => (
          <Comment
            key={comment.trim()}
            content={comment}
            onDeleteComment={deleteComment}
          />
        ))}
      </div>
    </article>
  );
}

function ContentHandler({ type, content }: { type: string; content: string }) {
  switch (type) {
    case "paragraph":
      return <p>{content}</p>;
    case "link":
      return <a href={content}>{content}</a>;
    default:
      return <p>{content}</p>;
  }
}
