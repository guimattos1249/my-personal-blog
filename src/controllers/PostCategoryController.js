const Category = require('../models/Category');

//TODO - fix the association to show only posts with category from the logged user

module.exports = {
  async index (req, res) {
    const id_category = req.params.id_category;

    try {
      const categories = await Category.findByPk( id_category, 
        { 
          include: { 
            association: 'posts',
            association: 'categories'
          }
        }
      );
  
      if(!categories)
        return res.status(404).json({error: 'Cannot find this post'});
      
      return res.json(categories);
    }
    catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal Server Error!'});
    }
    
  }
};