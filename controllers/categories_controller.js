import Categories from "../models/categories_models.js";

async function categoriesList() {
  let category = await Categories.find({ status: true });
  return category;
}

async function findCategory(id) {
  let category = await Categories.find({ _id: id });
  return category;
}

async function createCategory(body) {
  let category = new Categories({
    name: body.name,
    status: body.status,
  });
  return await category.save();
}

async function updateCategories(body, id) {
  let category = await Categories.updateOne(
    { _id: id },
    {
      $set: {
        name: body.name,
        status: body.status,
      },
    }
  );
  return category;
}

async function deleteCategory(id) {
  let category = await Categories.deleteOne({ _id: id });
  return category;
}

export {
  categoriesList,
  findCategory,
  createCategory,
  updateCategories,
  deleteCategory,
};
