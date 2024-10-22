// `app` directory

import { ImagesGallery } from '../components/gallery/imagesGallery'

 
// This function can be named anything
async function getProjects() {
  const res = await fetch(`https://strapi-147044-0.cloudclusters.net/api/gallery?populate=*`, { cache: 'no-store' })
  const projects = await res.json()
  console.log('proj', projects)
  return projects
}
 
export default async function Gallery() {
  const projects = await getProjects()
 console.log('proj', projects)
 console.log('ok')
  return (
    <div>
    <h1>Lista postówhfdd</h1>
    <h2>{projects?.data?.attributes?.title}</h2>
<ImagesGallery images={projects?.data?.attributes?.images?.data}/>
  </div>
  )
}