export const sortByDate = (a, b) => {
   // Since we added the .sort() to the post, we have access
   // to frontmatter  
   //This list will descending, since we say b - a
   return new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
}