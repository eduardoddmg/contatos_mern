const handleError = (res, message, STATUS_CODE, role=null) => res.status(STATUS_CODE).json({ success: false, message, role})

module.exports = handleError;