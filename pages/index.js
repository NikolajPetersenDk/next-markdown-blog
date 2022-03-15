// This is the home page

import fs from 'fs'
import path from 'path'
import Head from 'next/head'
import matter from 'gray-matter';
import Post from '../components/Post'; 
import { sortByDate } from '../utils'


export default function Home({ posts }) {
  // This logs the 'posts' property from the returned 'props' object
  // console.log(posts);

  return (
    <div>
      <Head>
        <title>Dev Blog</title>
      </Head>

      <div className="posts">
        {
          // Create a list with .map()
          posts.map((post, index) => (
            // <h3 key={index}>{post.frontmatter.title}</h3>
            <Post key={index} post={post}/>
          ))

        }
      </div>
    </div>
  )
}


// This will allow us to fetch data at build time
// Very useful for Static Generated pages that use external data
export async function getStaticProps() {

  // fs.readdirSync() reads the content of a specific directory
  // 'path.join('posts')' sets the dir to be 'posts' within the root folder
  const files = fs.readdirSync(path.join('posts'))

  // This is logged in VS since this is on the server side
  // What we get from 'files' is an array of all the filenames in 'posts' folder
  // console.log(files);

  // Get slug and frontmatter from posts
  const posts = files.map(filename => {
    // Create slug. For each item we remove the '.md' extension. (replace)
    const slug = filename.replace('.md', '')

    // Get frontmatter - this is simply just all code/text in the file
    // '.readFileSync' reads the entire content of a file
    // We are looking in the 'posts' folder
    const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8')

    // console.log(markdownWithMeta);

    // The frontmatter will be an object containing the different properties of the header part of the markdown file
    const {data:frontmatter} = matter(markdownWithMeta)

    // We return an object with all the slugs
    return {
      slug,
      frontmatter
    }
  })

  // console.log(posts);

  // Here we return a props object
  // We do this, so posts can be used as a prop up in the Home component
  return {
    props: {
      // .sort() takes a function and is used to sort the posts by date
      posts: posts.sort(sortByDate),
    }
  }
}