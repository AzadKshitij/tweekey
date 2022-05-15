import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

async function fetchPosts() {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  return data;
}
