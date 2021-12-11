import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { dev, prod } from "./api-config";

interface Response<T> {
  message: string;
  data: T[];
  links: {
    rel: string;
    link: string;
  }[];
}

const userRequest: AxiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === "prod" ? prod.user : dev.user,
});

const blogRequest: AxiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === "prod" ? prod.blog : dev.blog,
});

const commentRequest: AxiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === "prod" ? prod.comment : dev.comment,
});

const fetchBlogLists = async <Blog>(config: AxiosRequestConfig) => {
  type BlogRes = Response<Blog>;
  const res = await blogRequest.get<BlogRes>("/api/blog", config);
  return res.data;
};

const fetchBlogListsByUserId = async <Blog>(userId: string, config: AxiosRequestConfig) => {
  type BlogRes = Response<Blog>;
  const res = await blogRequest.get<BlogRes>(`/api/blog/user/${userId}`, config);
  return res.data;
};


const fetchBlogDetail = async <Blog>(
  id: string,
  config: AxiosRequestConfig
) => {
  type BlogRes = Response<Blog>;
  const res = await blogRequest.get<BlogRes>(`/api/blog/${id}`, config);
  return res.data;
};

const deleteBlogById = async <Blog>(blogId: string, config: AxiosRequestConfig = {}) => {
  type BlogRes = Response<Blog>;
  const res = await blogRequest.delete<BlogRes>(`/api/blog/${blogId}`, config);
  return res.data;
};

const fetchCommentsByBlogId = async <Comment>(
  blogId: string,
  config: AxiosRequestConfig
) => {
  type CommentRes = Response<Comment>;
  const res = await commentRequest.get<CommentRes>(
    `/api/comments/blog/${blogId}`,
    config
  );
  return res.data;
};

const postComments = async <Comment>(data: Comment, config: AxiosRequestConfig) => {
  const res = await commentRequest.post('/api/comments', data, config)
  return res.data;
}

const fetchUserInfo = async () => {
  const res = await userRequest.get("/login");
  return res.data;
};

const checkLogin = async (config: AxiosRequestConfig) => {
  try {
    const res = await userRequest.post("/verifyGoogleIdToken", config);
    if (res.status == 200) return true;
  } catch(e) {
    return false
  }
}

const postBlog = async <Blog>(data: Blog, config: AxiosRequestConfig = {}) => {
  const res = await blogRequest.post("/api/blog", data, config);
  console.log(res)
  return res.data;
};

export {
  // Blog
  fetchBlogLists,
  fetchBlogListsByUserId,
  fetchBlogDetail,
  postBlog,
  deleteBlogById,
  // Comment
  fetchCommentsByBlogId,
  postComments,
  // User
  fetchUserInfo,
  checkLogin,
  Response,
  AxiosRequestConfig as RequestConfig,
};
