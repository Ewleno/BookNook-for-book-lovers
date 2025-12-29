/**
 * Custom middleware to log every successful POST request
 * Logs timestamp and the ID of the user who made the request
 */
const postLogger = (req, res, next) => {
  // Store the original end function
  const originalEnd = res.end;

  // Override res.end to intercept the response
  res.end = function(chunk, encoding) {
    // Only log if the request method is POST and status is successful (2xx)
    if (req.method === 'POST' && res.statusCode >= 200 && res.statusCode < 300) {
      const timestamp = new Date().toISOString();
      const userId = req.session?.userId || 'Anonymous';
      
      console.log(`[POST Logger] ${timestamp} - User ID: ${userId} - Endpoint: ${req.path} - Status: ${res.statusCode}`);
    }

    // Call the original end function
    originalEnd.call(this, chunk, encoding);
  };

  next();
};

module.exports = postLogger;

