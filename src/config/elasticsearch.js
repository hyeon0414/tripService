const { Client } = require('@elastic/elasticsearch');

const elasticClient = new Client({
  node: process.env.ELASTICSEARCH_NODE,
  auth: {
    username: process.env.ELASTICSEARCH_USERNAME,
    password: process.env.ELASTICSEARCH_PASSWORD
  }
});

const connectElasticsearch = async () => {
  try {
    const info = await elasticClient.info();
    console.log('🔍 Elasticsearch Connected successfully.');
    console.log(`📊 Cluster: ${info.body.cluster_name}`);
    
    // Create index if not exists
    const indexExists = await elasticClient.indices.exists({
      index: process.env.ELASTICSEARCH_INDEX
    });
    
    if (!indexExists.body) {
      await elasticClient.indices.create({
        index: process.env.ELASTICSEARCH_INDEX,
        body: {
          mappings: {
            properties: {
              title: { type: 'text' },
              description: { type: 'text' },
              destination: { type: 'text' },
              content: { type: 'text' },
              tags: { type: 'keyword' },
              user_id: { type: 'keyword' },
              created_at: { type: 'date' }
            }
          }
        }
      });
      console.log(`📝 Index '${process.env.ELASTICSEARCH_INDEX}' created.`);
    }
  } catch (error) {
    console.error('❌ Elasticsearch connection error:', error);
    process.exit(1);
  }
};

module.exports = { elasticClient, connectElasticsearch }; 