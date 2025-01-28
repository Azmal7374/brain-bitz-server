import categoryModel from './category.model';

class CategoryService {
  // Add new category
  async createCategory(
    name: string,
    questions: { question: string; options: string[]; correctAnswer: string }[],
  ) {
    return await categoryModel.create({ name, questions });
  }

  // Get all categories
  async getCategories() {
    return await categoryModel.find();
  }
}

export default new CategoryService();
