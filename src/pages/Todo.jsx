// @ts-nocheck
import React, { useState } from "react";
import { useQuery, useMutation } from "react-query";
import { useQueryClient } from "react-query";
import axios from "axios";

// Import the Slate editor factory.
import { createEditor } from "slate";

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from "slate-react";

async function fetchPosts() {
  const userId = "6280ac484180045b248e2cf5";
  const { data } = await axios.get(`http://localhost:8000/todo/user/${userId}`);

  console.log("data :", data.data);

  return data.data;
}

async function addTodo(content) {
  const userId = "6280ac484180045b248e2cf5";
  const content_ = JSON.stringify(content);
  console.log("content :", content_);
  const { data } = await axios.post(`http://localhost:8000/todo/add`, {
    // content: content,
    content: `${content_}`,
    done: false,
    user_id: userId,
    color: "#f3f",
    date: Date(),
  });
  console.log("data :", data.data);
  return data.data;
}

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "A line of text in a paragraph." }],
  },
];

function Todo() {
  const queryClient = useQueryClient();

  const { data, error, isError, isLoading } = useQuery("posts", fetchPosts);

  const { mutate, isLoading_ } = useMutation(addTodo, {
    onSuccess: (data) => {
      console.log(data);
      const message = "success";
      alert(message);
    },
    onError: () => {
      alert("there was an error");
    },
    onSettled: () => {
      queryClient.invalidateQueries("create");
    },
  });

  const [value, setValue] = useState(initialValue);
  // @ts-ignore
  const [editor] = useState(() => withReact(createEditor()));
  // first argument is a string to cache and track the query result
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    // @ts-ignore
    return <div>Error! {error.message}</div>;
  }

  return (
    <div className="container">
      <h1>Posts</h1>
      <div className="border-2 rounded-lg px-4 py-4 mx-2">
        <Slate
          editor={editor}
          value={value}
          onChange={(value) => {
            console.log("value :", value);
            const isAstChange = editor.operations.some(
              (op) => "set_selection" !== op.type
            );
            if (isAstChange) {
              // Save the value to Local Storage.
              //   const content = JSON.stringify(value);
              // @ts-ignore
              setValue(value);
            }
          }}
        >
          <Editable />
        </Slate>
      </div>

      <button
        onClick={() => {
          mutate(value);
        }}
      >
        Add Todo
      </button>

      {data.map((post, index) => {
        return (
          <div className="border-2 rounded-lg px-2 py-2 mx-2 my-2" key={index}>
            <h1>{post.content}</h1>
          </div>
        );
      })}
    </div>
  );
}

export default Todo;
