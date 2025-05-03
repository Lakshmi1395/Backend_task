const asyncHandler = require('../utils/async-handler');
const { PrismaClient } = require('@prisma/task/client');
const prisma = new PrismaClient();

const createProduct = asyncHandler(async (req, res) => {

  const values = req.body;
  const user = req.user;

  if (!values.name || !values.price || !values.user_id) {
    let error = new Error("All fields are mandatory.");
    error.status = 400;
    throw error;
  }

  let existingUser = await prisma.user.findUnique({
    where: { id: values.user_id }
  });

  if (!existingUser) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  let existingProduct = await prisma.product.findFirst({
    where: {
      name: {
        contains: values.name,
        mode: 'insensitive'
      }
    }
  });

  if (existingProduct) {
    const error = new Error("Product Name already exists");
    error.status = 404;
    throw error;
  }

  let newProduct = await prisma.product.create({
    data: {
      name: values.name,
      description: values.description ?? '',
      price: values.price,
      user_id: values.user_id,
      created_by: user.id,
    }
  });

  return newProduct

});


const getProducts = asyncHandler(async (req, res) => {

  const values = req.query;
  const query = {};

  if (values.user_id) {
    query.user_id = Number(values.user_id);
  }

  if (values.name) {
    query.name = {
      contains: values.name,
      mode: 'insensitive'
    };
  }

  if (values.is_deleted !== undefined && values.is_deleted !== '') {
    query.is_deleted = values.is_deleted === 'true';
  }

  const page = parseInt(values.page) || 1;
  const limit = parseInt(values.limit) || 10;
  const skip = (page - 1) * limit;

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where: query,
      skip,
      take: limit,
      include: {
        user: true
      }
    }),
    prisma.product.count({ where: query })
  ]);

  if (!products || products.length === 0) {
    const error = new Error("Product not found");
    error.status = 404;
    throw error;
  }

  return {
    data: products,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  }

});


const getProductById = asyncHandler(async (req, res) => {

  const values = req.params;

  let existingProduct = await prisma.product.findUnique({
    where: { id: Number(values.id) }
  });

  if (!existingProduct) {
    const error = new Error("Product not found");
    error.status = 404;
    throw error;
  }

  return existingProduct

});

const updateProduct = asyncHandler(async (req, res) => {
  const values = req.body;
  const params = req.params;
  const user = req.user;

  if (!params.id) {
    let error = new Error("Id required to Update Product.");
    error.status = 400;
    throw error;
  }

  let existingProduct = await prisma.product.findUnique({
    where: { id: Number(params.id) }
  });

  if (!existingProduct) {
    const error = new Error("Product not found");
    error.status = 404;
    throw error;
  }

  if (values.user_id) {
    let existingUser = await prisma.user.findUnique({
      where: { id: values.user_id }
    });

    if (!existingUser) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }
  }

  const updateData = {
    ...values,
    updated_by: user.id,
    updated_at: new Date()
  }

  const update = await prisma.product.update({
    where: { id: Number(params.id) },
    data: updateData
  });

  return update;
});

const deleteProduct = asyncHandler(async (req) => {
  const params = req.params;
  const user = req.user;

  if (!params.id) {
    let error = new Error("Id required to Update Product.");
    error.status = 400;
    throw error;
  }

  let existingProduct = await prisma.product.findUnique({
    where: { id: Number(params.id) }
  });

  if (!existingProduct) {
    const error = new Error("Product not found");
    error.status = 404;
    throw error;
  }

  const deleteData = {
    is_deleted: true,
    deleted_by: user.id,
    deleted_at: new Date()
  }

  const deleteRecord = await prisma.product.update({
    where: { id: Number(params.id) },
    data: deleteData
  });

  return deleteRecord;
});



module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
}