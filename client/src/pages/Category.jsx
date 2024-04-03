
import { Link } from 'react-router-dom';
import useCategory from '../hooks/CategoryHook';
import Layout from '../components/Layout/Layout';


const Category = () => {
  const categories = useCategory();

  return (
    <Layout title={"category"}>
      <h1>All Categories</h1>
      <ul>
        {categories.map(category => (
          <li key={category._id}>
            <Link to={`/category/${category.slug}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export default Category;
