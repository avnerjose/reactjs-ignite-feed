import { Avatar } from "./Avatar";
import { Comment } from "./Comment";
import styles from "./Post.module.css";

export function Post() {
  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src="https://github.com/avnerjose.png"/>
          <div className={styles.authorInfo}>
            <strong>Avner José</strong>
            <span>Web Developer</span>
          </div>
        </div>
        <time
          dateTime="2022-05-11 08:10:00"
          title="11 de Maio de 2022 às 08h10"
        >
          Publicado à uma hora
        </time>
      </header>

      <div className={styles.content}>
        <p>Fala galera 👋</p>
        <p>Acabei de subir um projeto no meu portfólio.</p>
        <p>
          👉 {"  "}
          <a href="">github.com/avnerjose</a>
        </p>
        <p>
          <a href="">#novoprojeto</a>
          <a href="">#dev</a>
        </p>
      </div>

      <form className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>
        <textarea placeholder="Deixe um comentário" />
        <footer>
          <button type="submit">Comentar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        <Comment />
        <Comment />
        <Comment />
      </div>
    </article>
  );
}
