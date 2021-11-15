const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  // Query those products that are featured
  // const products = await Product.find({ featured: true });

  // Using regex for partial string match and case insensitivity
  // const search = "ab";
  // const products = await Product.find({
  //   name: { $regex: search, $options: "i" },
  // });

  // Chaining methods
  // const products = await Product.find({}).sort("-name");
  // Add - to get items in descending order

  // Return only specific fields,
  // const products = await Product.find({}).select("name price").limit(4).skip(2);

  // Using relational operators
  const products = await Product.find({ price: { $gt: 100 } })
    .sort("price")
    .select("name price");
  res.status(200).json({ data: products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  // Query documents based on request parameters
  // const products = await Product.find(req.query);

  // Filter only the parameters using which we want to query the collection
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  // Now instead of passing it to find, create a query object
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }

  if (company) {
    queryObject.company = company;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  /* Numeric filters */
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };

    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );

    // The numeric filter properties does not work on values other than numbers
    const options = ["price", "rating"];
    filters = filters.split(',').forEach((item) => {
      // price-$gt-40
      //     price    $gt      40
      const [field, operator, value] = item.split('-');
      if (options.includes(field)) {
        // { price: { '$gt': 40 }, rating: { '$gte': 4 } }
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  console.log("Numeric filter:", queryObject);

  // We can chain the sort() method but there may be a case when the user
  //  does not request the data in sorted manner, so we have to add a condition
  let result = Product.find(queryObject);

  /* Sort data using name, price etc */
  if (sort) {
    // products = products.sort(sort);
    // If multiple options are passed eg: price and name
    // As the sorting options are passed as comma separated values sort=-name,-price
    // And we pass space separated values to the join() method
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    // Default sort parameter
    result = result.sort("createdAt");
  }

  /* Return only specific values instead of an entire object */
  if (fields) {
    // "fields" is not a reserved keyword
    const fieldList = fields.split(",").join(" ");
    result = result.select(fieldList);
  }

  /* Pagination */
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  /**
   * For 23 results if we want to display 7 results on each page,
   * result will be printed on 4 pages as: 7 7 7 2
   */

  const products = await result;
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
