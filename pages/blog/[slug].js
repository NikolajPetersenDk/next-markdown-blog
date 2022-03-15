// This is dynamic, the slug can be anything, therefor we use [slug]
// THis is the page of each blog post

import fs from 'fs'
import matter from 'gray-matter'
import {marked} from 'marked'
import Link from 'next/link'
import path from 'path'


 
function PostPage({ frontmatter: {title, date, cover_image}, 
   slug, 
   content 
}) {
  return (
    <>
      <Link href='/'> 
         <a className="btn btn-back">Get back yall</a>
      </Link>

      <div className="card card-page">
         <h1 className="post-title">{title}</h1>
         <div className="post-date">Posted on {date}</div>
         <img src={cover_image} />
         <div className="post-body">
            <div dangerouslySetInnerHTML={{__html: marked(content) }}></div>
         </div>
      </div>
    </>
  )
}

export default PostPage


// To get the paths 
export async function getStaticPaths() {
   const files = fs.readdirSync(path.join('posts'))

   // This defines how the paths will be structured
   const paths = files.map(filename => ({
      params: {
         slug: filename.replace('.md', '')
      }
   }))

   // Returns an object with paths
   // It will be an array with objects
   return {
      paths: paths,

      // If you try to access a path/slug that does not exist
      // it will give us a 404 page
      fallback: false
   }
}

// We use this function to get the static props 
// so that the static generated page can use them, before rendering
export async function getStaticProps({ params: {slug}}) {
   const markdownWithMeta = fs.readFileSync(path.join('posts', slug + '.md'), 'utf-8')

   // we use matter() to get the frontmatter and content from our post files
   //We also used this to get frontmatter on the home page
   // but here we also need the content, since here it's the post page
   const {data:frontmatter, content} = matter(markdownWithMeta)

   // Returns an object with props, to be used in PostPage() function
   return {
      props: {
         frontmatter,
         content,
         slug
      }
   }
}