function CategoryType({category}) {
  return <option>{category.category_type ? 'Income' : 'Expence'}</option>
}

export default CategoryType