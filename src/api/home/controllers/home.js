'use strict';

/**
 * home controller
 */

const { createCoreController } = require('@strapi/strapi').factories;


module.exports = createCoreController('api::home.home',({strapi})=> ({

async find(ctx){
  const sanitizedQueryParams = await this.sanitizeQuery(ctx);
  const {
    search,
    location,
    category,
    order,
    price,
    page
    
  } = sanitizedQueryParams;

  const sortOptions = {
      high: "price:desc",
      low: "price:asc",
      "a-z": "title:asc",
      "z-a": "title:desc",
    };

     const queryObject = {
      populate: "*",
      sort: sortOptions["a-z"],
      filters: {},
    };

    if(order){
      queryObject.sort = sortOptions[order];
    }

    if(search){
      queryObject.filters.title = { $containsi: search};
    }

       if (location && location !== "all") {
      queryObject.filters.location = { $eqi:location };
    }
    if (category && category !== "all") {
      queryObject.filters.category = { $eqi: category };
    }

     
   
      if (price) {
        
      queryObject.filters.price = { $lte: price };
    }
    if (page) {
      queryObject.pagination = { page: page };
    }

    const { results: homes } = await strapi
      .service("api::home.home")
      .find({ populate: "*", pagination: { pageSize: "100" } });

      const { categories, locations } = homes.reduce(
      (result, home) => {
        const { categories, locations } = result;
        const { category, location } = home;
        if (!categories.includes(category)) {
          categories.push(category);
        }
        if (!locations.includes(location)) {
          locations.push(location);
        }

        return result;
      },
      { categories: ["all"], locations: ["all"] }
    );

      const { results, pagination } = await strapi
      .service("api::home.home")
      .find(queryObject);
    const sanitizedResults = await this.sanitizeOutput(results, ctx);

    return this.transformResponse(sanitizedResults, {
      pagination,
      categories,
      locations,
    });

    
}






}));
