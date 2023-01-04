import { Header } from "./components/Header";
import styles from "./App.module.css";
import { Sidebar } from "./components/Sidebar";
import { Post } from "./components/Post";

const posts = [
  {
    id: 1,
    author: {
      avatarUrl: "https://github.com/avnerjose.png",
      name: "Avner José",
      role: "Front-end developer",
    },
    content: [
      { type: "paragraph", content: "Fala galera 👋" },
      {
        type: "paragraph",
        content: "Acabei de subir um projeto no meu portfólio.",
      },
      { type: "link", content: "github.com/avnerjose" },
    ],
    publishedAt: new Date("2022-12-20 08:00:00"),
  },
  {
    id: 2,
    author: {
      avatarUrl: "https://github.com/maykbrito.png",
      name: "Mayk Brito",
      role: "Educator at Rocketseat",
    },
    content: [
      { type: "paragraph", content: "Fala galera 👋" },
      {
        type: "paragraph",
        content: "Acabei de subir um projeto no meu portfólio.",
      },
      { type: "link", content: "github.com/maykbrito" },
    ],
    publishedAt: new Date("2022-12-10 08:00:00"),
  },
];

export function App() {
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </main>
      </div>
    </>
  );
}
