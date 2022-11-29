const handleError = (res, message, STATUS_CODE) => res.status(STATUS_CODE).json({ success: false, message })

module.exports = handleError;