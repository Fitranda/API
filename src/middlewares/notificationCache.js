// Simple in-memory cache for notifications
const cache = new Map();
const CACHE_DURATION = 2 * 60 * 1000; // 2 minutes

const notificationCache = (req, res, next) => {
  const cacheKey = `notifications_${req.path}_${req.user?.employeeId || 'anonymous'}`;
  const cachedData = cache.get(cacheKey);
  
  if (cachedData && (Date.now() - cachedData.timestamp) < CACHE_DURATION) {
    return res.json(cachedData.data);
  }
  
  // Override res.json to cache the response
  const originalJson = res.json;
  res.json = function(data) {
    // Only cache successful responses
    if (res.statusCode === 200) {
      cache.set(cacheKey, {
        data: data,
        timestamp: Date.now()
      });
      
      // Clean up old cache entries
      cleanupCache();
    }
    
    return originalJson.call(this, data);
  };
  
  next();
};

// Clean up expired cache entries
const cleanupCache = () => {
  const now = Date.now();
  for (const [key, value] of cache.entries()) {
    if (now - value.timestamp > CACHE_DURATION) {
      cache.delete(key);
    }
  }
};

// Clear cache manually if needed
const clearNotificationCache = () => {
  cache.clear();
};

module.exports = {
  notificationCache,
  clearNotificationCache
};
