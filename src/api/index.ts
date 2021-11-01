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
  const res = await blogRequest.get<BlogRes>("/api/blogs", config);
  return res.data;
};

const fetchBlogDetail = async <Blog>(
  id: string,
  config: AxiosRequestConfig
) => {
  type BlogRes = Response<Blog>;
  const res = await blogRequest.get<BlogRes>(`/api/blogs/${id}`, config);
  return res.data;
};

export {
  fetchBlogLists,
  fetchBlogDetail,
  Response,
  AxiosRequestConfig as RequestConfig,
};
