import Link from 'next/link'

function Post({ post }) {
  return (
    <div className='card'>
       <img 
         src={post.frontmatter.cover_image} 
         alt="" />

         <div className="post-date">Posted on {post.frontmatter.date}</div>

         <h3>{post.frontmatter.title}</h3>

         <p>{post.frontmatter.excerpt}</p>

         {/* we use 'post.slug' since it is the file name, minus the
         .md extension. With Next.js the URL will be the path in pages */}
         <Link href={`/blog/${post.slug}`} >
            <a className='btn'>Read More</a>
         </Link>
    </div>
  )
}

export default Post