const { elasticClient } = require('../config/elasticsearch');
const Trip = require('../models/Trip');
const User = require('../models/User');
const { Op } = require('sequelize');

// @desc    Search trips
// @route   GET /api/search/trips
// @access  Private
const searchTrips = async (req, res) => {
  try {
    const { q, destination, status, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    let searchQuery = {
      index: process.env.ELASTICSEARCH_INDEX,
      body: {
        query: {
          bool: {
            must: [
              { term: { type: 'trip' } }
            ],
            filter: []
          }
        },
        sort: [{ created_at: { order: 'desc' } }],
        from: offset,
        size: parseInt(limit)
      }
    };

    // Add search terms
    if (q) {
      searchQuery.body.query.bool.must.push({
        multi_match: {
          query: q,
          fields: ['title^2', 'description', 'destination', 'tags'],
          fuzziness: 'AUTO'
        }
      });
    }

    // Add filters
    if (destination) {
      searchQuery.body.query.bool.filter.push({
        term: { destination: destination.toLowerCase() }
      });
    }

    if (status) {
      searchQuery.body.query.bool.filter.push({
        term: { status: status }
      });
    }

    const result = await elasticClient.search(searchQuery);

    res.json({
      success: true,
      data: {
        trips: result.body.hits.hits.map(hit => ({
          id: hit._id,
          ...hit._source,
          score: hit._score
        })),
        total: result.body.hits.total.value,
        page: parseInt(page),
        totalPages: Math.ceil(result.body.hits.total.value / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Search users
// @route   GET /api/search/users
// @access  Private
const searchUsers = async (req, res) => {
  try {
    const { q, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = {};
    if (q) {
      whereClause[Op.or] = [
        { name: { [Op.iLike]: `%${q}%` } },
        { email: { [Op.iLike]: `%${q}%` } }
      ];
    }

    const users = await User.findAndCountAll({
      where: whereClause,
      attributes: ['id', 'name', 'email', 'profile_image', 'is_verified'],
      order: [['name', 'ASC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      success: true,
      data: {
        users: users.rows,
        total: users.count,
        page: parseInt(page),
        totalPages: Math.ceil(users.count / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Global search
// @route   GET /api/search/global
// @access  Private
const searchGlobal = async (req, res) => {
  try {
    const { q, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    if (!q) {
      return res.status(400).json({
        success: false,
        error: 'Search query is required'
      });
    }

    const searchQuery = {
      index: process.env.ELASTICSEARCH_INDEX,
      body: {
        query: {
          multi_match: {
            query: q,
            fields: ['title^2', 'description', 'destination', 'content', 'tags'],
            fuzziness: 'AUTO'
          }
        },
        sort: [{ created_at: { order: 'desc' } }],
        from: offset,
        size: parseInt(limit)
      }
    };

    const result = await elasticClient.search(searchQuery);

    res.json({
      success: true,
      data: {
        results: result.body.hits.hits.map(hit => ({
          id: hit._id,
          type: hit._source.type,
          ...hit._source,
          score: hit._score
        })),
        total: result.body.hits.total.value,
        page: parseInt(page),
        totalPages: Math.ceil(result.body.hits.total.value / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  searchTrips,
  searchUsers,
  searchGlobal
}; 